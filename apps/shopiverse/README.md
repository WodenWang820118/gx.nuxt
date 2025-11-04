# Shopiverse

## Table of contents

- [TypeORM with SQLite](#typeorm-with-sqlite)
- [Database Setup](#database-setup)
- [Entities](#entities)
- [Order and OrderItems](#order-and-orderitems)

## TypeORM with SQLite

This project uses TypeORM with SQLite3 for demonstration purposes. The database is automatically created and synchronized when the server starts.

## Database Setup

The database configuration is in `src/server/database.ts`. The SQLite database file will be created at `apps/shopiverse/database.sqlite`.

No manual setup is required - the database and tables are automatically created when you run the dev server:

```bash
pnpm run dev:shopiverse
```

## Entities

The TypeORM entities are located in `src/server/entities/`. Currently includes:

- **Product**: Stores product information including title, description, price, quantity, etc.

## Order and OrderItems

**Note:** Order and OrderItems functionality is currently simplified for demonstration purposes. Full implementation with database persistence would require:

- Creating Order and OrderItem entities
- Adding corresponding API endpoints
- Implementing proper transaction handling

### to-do

- TODO: Implement Order and OrderItem entities with TypeORM
- TODO: Add authentication system to replace Supabase auth
- TODO: After purchasing, the product quantity should be updated; if the quantity is 0, the product should be removed from `products` table
- TODO: Add the stock quantity on the frontend
- TODO: Implement proper error handling for database operations
