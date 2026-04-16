# Nginx Reverse Proxy with Self-Signed SSL

Sets up Nginx on the remote Oracle Linux host (`opc@152.70.155.113`) to terminate HTTPS on port 443 and proxy traffic to the Meteor app on port 3000.

---

## Prerequisites

- SSH access to the remote host: `ssh opc@152.70.155.113`
- The Meteor app running via `systemd` (`meteor-app.service`) on port 3000
- `sudo` privileges

> Meteor listens on port **3000** (confirmed via `sudo ss -tlnp | grep node`).

---

## Step 1 — Install Nginx

Oracle Linux uses `yum` / `dnf`:

```bash
sudo dnf install -y nginx
```

Verify:

```bash
nginx -v
```

---

## Step 2 — Generate a Self-Signed SSL Certificate

Create a dedicated directory and generate a 2048-bit RSA key + certificate valid for 10 years:

```bash
sudo mkdir -p /etc/nginx/ssl

sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/meteor-app.key \
  -out    /etc/nginx/ssl/meteor-app.crt \
  -subj "/C=UA/ST=State/L=City/O=MyOrg/CN=152.70.155.113"
```

Lock down the private key:

```bash
sudo chmod 600 /etc/nginx/ssl/meteor-app.key
```

---

## Step 3 — Configure the Firewall

### 3a. System firewall (firewalld)

Open only ports 80 and 443. Port 3000 must **not** be opened — Nginx reaches it via the loopback interface which bypasses firewalld, so there is no need to expose it externally:

```bash
sudo firewall-cmd --permanent --add-service=https   # port 443
sudo firewall-cmd --permanent --add-service=http    # port 80 (for redirect)
sudo firewall-cmd --reload
sudo firewall-cmd --list-services
```

If port 3000 was previously opened, remove it:

```bash
sudo firewall-cmd --permanent --remove-port=3000/tcp
sudo firewall-cmd --reload
```

### 3b. Oracle Cloud security list (OCI console)

In the OCI web console, go to:

**Networking → Virtual Cloud Networks → your VCN → Security Lists → Default Security List**

Add two **Ingress Rules** and ensure port 3000 has **no** ingress rule:

| Stateless | Source CIDR | IP Protocol | Destination Port |
|-----------|-------------|-------------|------------------|
| No | 0.0.0.0/0 | TCP | 443 |
| No | 0.0.0.0/0 | TCP | 80 |

Without this step, cloud-level traffic on 443 is blocked regardless of the OS firewall.

---

## Step 4 — Disable the Default Nginx Server Block

The default `/etc/nginx/nginx.conf` contains a `server { listen 80 default_server; ... }` block that intercepts all HTTP traffic before your custom config gets a chance. Remove it.

Open the file:

```bash
sudo nano /etc/nginx/nginx.conf
```

Find and **delete** the entire `server { ... }` block inside `http { }` (the one with `listen 80 default_server` and `listen [::]:80 default_server`). Leave the `http { }` wrapper and the `include /etc/nginx/conf.d/*.conf;` line intact.

Save and close.

---

## Step 5 — Allow Nginx to Proxy Connections (SELinux)

Oracle Linux runs SELinux in enforcing mode by default. Without this, Nginx cannot open connections to localhost:3000 and returns `502 Bad Gateway` even though everything else is configured correctly:

```bash
sudo setsebool -P httpd_can_network_connect 1
```

The `-P` flag makes the change persistent across reboots.

---

## Step 6 — Create the Nginx Site Config

Create `/etc/nginx/conf.d/meteor-app.conf`:

```bash
sudo tee /etc/nginx/conf.d/meteor-app.conf > /dev/null <<'EOF'
# Redirect plain HTTP → HTTPS
server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}

# HTTPS reverse proxy
server {
    listen 443 ssl http2;
    server_name _;

    ssl_certificate     /etc/nginx/ssl/meteor-app.crt;
    ssl_certificate_key /etc/nginx/ssl/meteor-app.key;

    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    # WebSocket support (required by Meteor DDP)
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_read_timeout 86400;
    }
}
EOF
```

---

## Step 7 — Update the Meteor App's ROOT_URL

Meteor needs to know its public URL. Edit your `meteor-app.service` (or wherever the app is started) and change `ROOT_URL` from `http://` to `https://`:

```bash
sudo systemctl edit meteor-app --full
```

Find the `ExecStart` line and update:

```
ROOT_URL=https://152.70.155.113
```

If you do not have a systemd unit file yet, here is a minimal template you can place at `/etc/systemd/system/meteor-app.service`:

```ini
[Unit]
Description=Meteor App
After=network.target mongod.service

[Service]
Type=simple
User=opc
WorkingDirectory=/home/opc/bundle/programs/server
Environment=PORT=3000
Environment=ROOT_URL=https://152.70.155.113
Environment=MONGO_URL=mongodb://localhost:27017/fop
ExecStart=/usr/bin/node /home/opc/bundle/main.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

After editing, reload systemd and restart the app:

```bash
sudo systemctl daemon-reload
sudo systemctl restart meteor-app
```

---

## Step 8 — Test and Enable Nginx

```bash
# Validate config syntax
sudo nginx -t

# Start Nginx and enable it on boot
sudo systemctl start  nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

---

## Step 9 — Verify

From your local machine:

```bash
# Should return HTTP 301 redirect to HTTPS
curl -I http://152.70.155.113

# Should return HTTP 200 (certificate warning is expected for self-signed)
curl -Ik https://152.70.155.113
```

Open in a browser: `https://152.70.155.113`

The browser will show a certificate warning because the cert is self-signed. Click **Advanced → Proceed** (Chrome) or **Accept the Risk** (Firefox) to continue. This is expected behaviour for self-signed certificates.

---

## Troubleshooting

| Problem | Check |
|---------|-------|
| `502 Bad Gateway` | SELinux blocking proxy — run `sudo setsebool -P httpd_can_network_connect 1` first; also check `sudo systemctl status meteor-app` |
| `Welcome to Nginx` on port 80 | Default `server` block in `/etc/nginx/nginx.conf` not removed — see step 4 |
| WebSocket disconnects | `proxy_read_timeout` or missing `Upgrade` headers — check the config in step 4 |
| Port 443 unreachable | OCI security list not updated (step 3b) or `firewalld` blocking — `sudo firewall-cmd --list-all` |
| SELinux blocking Nginx | `sudo setsebool -P httpd_can_network_connect 1` |
| Nginx won't start | `sudo journalctl -u nginx -n 50` |

---

## Updating the Deploy Script

After this setup, update `ROOT_URL` in the remote `deploy-meteor.sh` script to match:

```bash
ROOT_URL=https://152.70.155.113
```

And from your local machine, the deploy workflow remains unchanged:

```bash
npm run build
npm run deploy        # SCP the tarball
npm run restart:remote  # SSH restart
```
