# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bobeira-Web is a collaborative card game application where users create custom cards, join rooms via passkeys, and play together.

### Backend

- Node.js + Express + TypeScript
- Keycloak authentication (keycloak-connect adapter)
- SQLite database with Prisma ORM

### Frontend

- Vue3
- Typescript
- Tailwindcss
- Axios

## Commands

All commands run from `frontend/` directory:

```bash
npm run dev      # Start Vite dev server with hot reload
npm run build    # TypeScript check + Vite production bundle
npm run preview  # Preview production build locally
```

No test suite is currently configured.

## Architecture

### Tech Stack

- **Frontend**: Vue 3.5 (Composition API), TypeScript 5.9, Vite 7.2, Tailwind CSS 4
- **Auth**: Keycloak SSO (realm: `sachettiHub`, client: `bobeira`)
- **State**: Vue Composition API + localStorage persistence

### Page Navigation

No Vue Router—uses simple state-based routing via `appStore.currentPage`. Pages: `home` → `room-creation` / `join-room` → `deck`.

### Store Pattern

All stores follow this pattern:

```typescript
const state = reactive({ /* data */ });
export const useStore = () => ({ state, actions... });
```

- `app-store.ts` — Current page navigation
- `deck-store.ts` — Card collection (localStorage, crypto UUIDs)
- `user-store.ts` — Username preference

### Authentication Flow

Keycloak initializes before app mount in `main.ts`. Login required to render app. Token auto-refreshes every 60 seconds. Use `useAuth()` composable for auth state and actions.

## CORS Configuration

- Backend uses `cors` middleware to allow cross-origin requests
- Allowed origins: `http://localhost:5173` (dev) and `https://sachetti.dev.br` (prod)
- Credentials enabled for authenticated requests

### Path Aliases

Configured in `vite.config.ts`: `@/*`, `@components/*`, `@stores/*`, `@views/*`, `@assets/*`

### SVG Assets

Imported as Vue components: `import Icon from '@assets/icon.svg'`

## Deployment

- Base URL: `/bobeira/` (sub-path deployment)
- CI/CD: GitHub Actions on push to `main` → builds frontend → rsync to production → restarts nginx container
- Keycloak server: `https://sachetti.dev.br`

## Important Aspects For Conversations

- For every new conversation context, creates a file inside `/claude-context/conversation-output` and udpate the file with the new project concepts from the current conversation. After the conversation, I will check the file to bring new aspects for this file `CLAUDE.MD`. Ignore all points that are already on `CLAUDE.MD` and do not focus on task steps, focus on the final app context.
