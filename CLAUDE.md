# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Action | Command |
|--------|---------|
| Start dev server | `npm start` (requires MongoDB on `localhost:27017`) |
| Run tests (once) | `npm test` |
| Run tests (watch) | `npm run test-app` |
| Lint | `npx eslint .` |
| Build for production | `npm run build` |
| Full deploy (build + SCP + SSH restart) | `./deploy_to_remote.sh` |

## Architecture

Meteor.js full-stack app with React 16. The Meteor convention of `imports/` for lazily-loaded shared code is used throughout.

### Data flow

- **`server/main.js`** — seeds initial data on startup (tasks, users, payments) if collections are empty. Exposes MongoDB collections via Meteor's pub/sub.
- **`imports/api/`** — three Mongo collections: `TasksCollection`, `UsersCollection`, `PaymentsCollection`. Each exported from its own file.
- **`client/main.jsx`** — React entry point, renders `<App />` into the DOM.
- **`imports/ui/App.jsx`** — root component that handles auth state and routing. Auth state is persisted to `localStorage` (key `u`) as a JSON object `{ id, login, pass, role }`.

### Authentication & roles

Auth is custom (not Meteor Accounts). Passwords are MD5-hashed. Two roles drive the entire routing tree in `App.jsx`:
- **`user`** — sees their own `Payments` view for current and previous year
- **`accountant`** — sees `Report` (all users) for current and previous year, plus `/payments` for their own payments

### Styling convention

Each feature component (e.g. `Login.jsx`) has a companion `Login.sc.jsx` file containing Emotion styled-components. Shared layout primitives (`FlexRow`, `FlexColumn`) live in `imports/ui/components/`.

### Constants

- `imports/constants/taxes.js` — tax rate constants
- `imports/constants/theme.js` — Emotion theme tokens
- `imports/constants/ukrMonths.js` — Ukrainian month name strings (UI is localized to Ukrainian)

## Key conventions

- React components: PascalCase `.jsx`; utilities: camelCase `.js`
- Styled component files use `.sc.jsx` suffix and live alongside their parent component
- ESLint: `eslint:recommended` + `plugin:react/recommended` (Airbnb config listed in `package.json` but the active `.eslintrc.js` does not extend it)
- `useTracker` (from `meteor/react-meteor-data`) is the reactive hook for subscribing to Mongo collections on the client
