# Backend Initialization - Conversation Context

## What Was Done

Initialized the backend project with:
- Node.js + Express + TypeScript
- Keycloak authentication (keycloak-connect adapter)
- SQLite database with Prisma ORM
- Two endpoints: public and private (Keycloak protected)

## Key Technical Decisions

### Prisma 7.x Configuration
Prisma 7 has major breaking changes:
- **No `url` in schema**: The `datasource` block no longer supports `url`. Connection URLs for migrations go in `prisma.config.ts`
- **Driver Adapters Required**: PrismaClient now requires an `adapter` option for direct database connections
- **LibSQL for SQLite**: Using `@prisma/adapter-libsql` + `@libsql/client` for SQLite connections

```typescript
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({ url: "file:./prisma/dev.db" });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });
```

### Keycloak Configuration
Using `keycloak-connect` with bearer-only mode (API authentication):
- Realm: `sachettiHub`
- Client: `bobeira`
- Auth server: `https://sachetti.dev.br`
- Bearer-only: true (no login redirects, expects JWT tokens)

### Project Structure
```
backend/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── config/
│   │   └── keycloak.ts       # Keycloak middleware config
│   └── generated/
│       └── prisma/           # Generated Prisma client
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── dev.db                # SQLite database file
├── prisma.config.ts          # Prisma 7 config (datasource URL)
├── package.json
└── tsconfig.json
```

### Database Schema
```prisma
model Card {
  id           String   @id @default(uuid())
  title        String
  description  String
  score        Int
  authorUserId String   @map("author_user_id")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@map("cards")
}
```

## Commands

```bash
npm run dev          # Start dev server with hot reload (tsx watch)
npm run build        # Compile TypeScript
npm run start        # Run compiled JS
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to DB (dev)
```

## Endpoints

- `GET /api/public` - Public endpoint, no auth required
- `GET /api/private` - Protected endpoint, requires Keycloak JWT token, logs user data
- `GET /health` - Health check

## Important Notes for Future

1. The `SESSION_SECRET` in keycloak.ts should be changed for production
2. The private endpoint extracts user data from `req.kauth.grant.access_token.content`
3. Prisma client is generated to `src/generated/prisma/` (custom output path)
