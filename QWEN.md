# QWEN.md - Meteor App Context

## Project Overview

This is a **Meteor.js** application built with **React**, originally scaffolded as `simple-todos-react`. It has been customized into a **payment tracking and reporting system** with user authentication and role-based access control.

**Tech Stack:**
- **Framework:** Meteor.js (full-stack JavaScript framework)
- **Frontend:** React 16 with React Router 5
- **Styling:** Emotion (CSS-in-JS)
- **Database:** MongoDB (via Meteor's Mongo collection API)
- **Testing:** Mocha (via `meteortesting:mocha`)
- **Linting:** ESLint with Airbnb config

## Architecture

### Directory Structure

```
├── client/            # Client-side entry point
│   └── main.jsx       # React render entry
├── server/            # Server-side entry point
│   └── main.js        # Server startup & seed data
├── imports/           # Shared code (loaded by both client & server)
│   ├── api/           # MongoDB collections (Tasks, Users, Payments)
│   ├── constants/     # Application constants
│   ├── helpers/       # Utility functions
│   └── ui/            # React components
│       ├── App.jsx    # Main app component with routing & auth
│       ├── components/
│       └── *.jsx      # Feature components (Login, Payments, Report, etc.)
├── tests/             # Test files
└── build/             # Build output
```

### Key Features

- **Role-based authentication:** Two roles — `user` and `accountant`
  - `user`: Can view/manage their own payments
  - `accountant`: Can view reports and manage all payments
- **Routing:** React Router with conditional rendering based on user role
- **Data persistence:** User session stored in `localStorage` (key: `u`)
- **Collections:**
  - `TasksCollection` — simple task list
  - `UsersCollection` — user accounts with login, password hash, and role
  - `PaymentsCollection` — payment records with income/expense tracking

## Building and Running

### Prerequisites
- Meteor installed
- MongoDB running locally on port `27017`

### Commands

| Action | Command |
|--------|---------|
| Start dev server | `npm start` |
| Run tests (once) | `npm test` |
| Run tests (watch) | `npm run test-app` |
| Build for production | `npm run build` |
| Visualize bundle | `npm run visualize` |
| Run built app locally | `npm run start:built` |
| Deploy to remote | `npm run deploy` |
| Restart remote server | `npm run restart:remote` |
| Full deploy (build + deploy + restart) | `./deploy_to_remote.sh` |

### Deployment

The app deploys to a remote server (`opc@152.70.155.113`) via SCP + SSH. The remote server runs on port 80.

## Development Conventions

- **ESLint:** Uses Airbnb config with plugins for React, JSX a11y, and import ordering
- **File naming:** PascalCase for React components (`.jsx`), camelCase for utilities (`.js`)
- **Styled components:** Uses Emotion with separate `.sc.jsx` files for styled components
- **Testing:** Mocha with assertions; tests verify both client and server behavior
- **Collection exports:** Each Mongo collection is exported from its own file under `imports/api/`

## Notes

- The app uses MD5 for password hashing (see `md5` dependency) — this is not cryptographically secure for production use
- User authentication is handled via `localStorage` rather than Meteor's built-in accounts system
- The app seeds initial data on server startup (tasks, users, payments) if collections are empty
