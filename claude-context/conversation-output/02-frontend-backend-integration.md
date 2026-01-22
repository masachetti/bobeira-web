# Frontend-Backend Integration

## API Service Pattern

- Created `frontend/src/services/api.ts` for authenticated API calls
- Uses `fetchWithAuth()` helper that automatically attaches Bearer token from Keycloak
- Token is refreshed before each request using `keycloak.updateToken(30)`
- Base URL configurable via `VITE_API_URL` environment variable (defaults to `http://localhost:3000`)

## CORS Configuration

- Backend uses `cors` middleware to allow cross-origin requests
- Allowed origins: `http://localhost:5173` (dev) and `https://sachetti.dev.br` (prod)
- Credentials enabled for authenticated requests

## Authentication Flow (Frontend to Backend)

1. Frontend retrieves token from Keycloak instance
2. Token is sent as `Authorization: Bearer <token>` header
3. Backend's `keycloak.protect()` middleware validates the token
4. User data extracted from validated token on backend

## Environment Variables

- `VITE_API_URL`: Backend API base URL (used in frontend)
