# Cards CRUD Implementation - Conversation Output

## Backend Architecture

The backend now follows a layered architecture pattern:

```
backend/src/
├── types/index.ts          # TypeScript interfaces (DTOs, request types)
├── middleware/auth.ts      # Auth middleware for extracting user from Keycloak token
├── services/card-service.ts # Business logic layer
├── controllers/card-controller.ts # Request/response handling
├── routes/card-routes.ts   # API route definitions
└── index.ts                # Main entry point with route registration
```

### Design Decisions

1. **Author Username Storage**: Chose to store `authorUsername` directly in the cards table (denormalized) rather than querying Keycloak or using a separate users table. This provides efficient reads without additional API calls. Trade-off: username changes in Keycloak won't reflect in existing cards.

2. **User Authorization**: Cards are filtered by `authorUserId` (Keycloak `sub` claim) ensuring users can only access their own cards.

3. **Service Layer**: Business logic is separated from request handling, making the code more testable and maintainable.

## API Endpoints

All card endpoints are protected by Keycloak authentication:

- `POST /api/cards` - Create a new card
- `GET /api/cards` - Get all user's cards
- `GET /api/cards/:id` - Get a specific card
- `PUT /api/cards/:id` - Update a card
- `DELETE /api/cards/:id` - Delete a card

## Frontend API Client

Replaced `fetch` with Axios for HTTP requests:

- **Axios interceptor**: Automatically attaches Bearer token to all requests
- **Token refresh**: Updates token before each request (30s margin)
- **Typed API methods**: `cardApi.getAll()`, `cardApi.create()`, etc.

## Database Schema Update

Added `authorUsername` field to the Card model in Prisma schema for storing the username at card creation time.
