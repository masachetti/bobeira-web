#!/bin/sh
set -e

# Sync database schema (creates db if not exists)
npx prisma db push --skip-generate

# Start the application
exec node dist/index.js
