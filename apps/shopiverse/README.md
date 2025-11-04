# Shopiverse

## Table of contents

- [Database Environment Setup](#database-environment-setup)
- [TypeORM with Multi-Database Support](#typeorm-with-multi-database-support)
- [Development Environment (SQLite3)](#development-environment-sqlite3)
  - [Mock Data Seeding](#mock-data-seeding)
- [Production Environment (Neon PostgreSQL)](#production-environment-neon-postgresql)
- [Database Setup](#database-setup)
- [Entities](#entities)
- [Order and OrderItems](#order-and-orderitems)

## Database Environment Setup

This project supports two database environments:

1. **Development**: SQLite3 (local file-based database)
2. **Production**: Neon PostgreSQL (cloud-hosted database)

The database switches automatically based on the `NODE_ENV` environment variable.

### Quick Start

1. **Copy the environment file:**

   ```bash
   cp apps/shopiverse/.env.example apps/shopiverse/.env
   ```

2. **For Development (SQLite3):**

   ```bash
   # In .env file
   NODE_ENV=development
   ```

3. **For Production (Neon PostgreSQL):**
   ```bash
   # In .env file
   NODE_ENV=production
   DATABASE_URL=postgresql://username:password@your-neon-host.neon.tech/dbname?sslmode=require
   ```

## TypeORM with Multi-Database Support

This project uses TypeORM with automatic database selection:

- **SQLite3** for local development (no setup required)
- **Neon PostgreSQL** for production deployment

The database configuration is in `src/server/database.ts` and automatically switches based on `NODE_ENV`.

### Database Configuration Logic

```typescript
// Development: SQLite3
if (NODE_ENV === 'development') {
  type: 'sqlite',
  database: './apps/shopiverse/database.sqlite'
}

// Production: Neon PostgreSQL
if (NODE_ENV === 'production') {
  type: 'postgres',
  url: process.env.DATABASE_URL
}
```

## Development Environment (SQLite3)

### Features

- ✅ Zero configuration required
- ✅ Automatic database file creation
- ✅ Auto-synchronization of schema (`synchronize: true`)
- ✅ Fast local development
- ✅ No external dependencies

### Setup

```bash
# 1. Ensure NODE_ENV is set to development (or not set)
NODE_ENV=development

# 2. Run the development server
pnpm run dev:shopiverse
```

The SQLite database file will be automatically created at `./apps/shopiverse/database.sqlite`.

### Mock Data Seeding

The development environment includes automatic mock data seeding:

- **25 pre-configured products** across 6 categories
- **Automatic seeding** on first server start
- **Idempotent** - won't duplicate data on restarts
- **Development only** - never seeds in production

#### Product Categories

| Category      | Count | Price Range    |
| ------------- | ----- | -------------- |
| Electronics   | 5     | $69.99-$299.99 |
| Clothing      | 5     | $24.99-$129.99 |
| Books         | 3     | $29.99-$49.99  |
| Home & Garden | 5     | $19.99-$199.99 |
| Sports        | 3     | $29.99-$349.99 |
| Toys          | 4     | $39.99-$59.99  |

#### Seed Data Files

- **`src/server/seed-data.ts`** - Mock product definitions
- **`src/server/plugins/seed-database.ts`** - Auto-seeding plugin

#### Reset Database

To clear and reseed the database:

```bash
# Remove database file
rm apps/shopiverse/database.sqlite

# Restart server (will auto-seed)
pnpm run dev:shopiverse
```

#### Console Messages

```
🌱 Starting database seeding...
📦 Inserting 25 mock products...
✅ Database seeded successfully! Total products: 25
📊 Categories included: Electronics, Clothing, Books, Home & Garden, Sports, Toys
```

If data already exists:

```
ℹ️  Database already contains 25 products. Skipping seed.
```

## Production Environment (Neon PostgreSQL)

### Features

- ✅ Scalable cloud database
- ✅ Automatic backups
- ✅ SSL/TLS encryption
- ✅ Serverless architecture
- ✅ PostgreSQL compatibility

### Setup

1. **Create a Neon Account:**
   - Visit [Neon.tech](https://neon.tech)
   - Create a new project
   - Create a database

2. **Get Your Connection String:**
   - From Neon dashboard, copy your connection string
   - Format: `postgresql://username:password@host.neon.tech/dbname?sslmode=require`

3. **Configure Environment:**

   ```bash
   # In apps/shopiverse/.env
   NODE_ENV=production
   DATABASE_URL=postgresql://your-connection-string
   ```

4. **Run Migrations (Production):**
   Since `synchronize` is disabled in production, you need to create tables manually:

   ```sql
   -- Connect to your Neon database and run:
   CREATE TABLE products (
     id VARCHAR(255) PRIMARY KEY,
     user_id VARCHAR(255) NOT NULL,
     title VARCHAR(500) NOT NULL,
     description TEXT,
     image VARCHAR(1000),
     category VARCHAR(100),
     quantity INTEGER NOT NULL,
     price INTEGER NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Deploy:**
   ```bash
   NODE_ENV=production pnpm run build-shopiverse
   ```

### Environment Variables Reference

| Variable       | Required        | Description                       | Example                                    |
| -------------- | --------------- | --------------------------------- | ------------------------------------------ |
| `NODE_ENV`     | Yes             | Environment mode                  | `development` or `production`              |
| `DATABASE_URL` | Production only | Neon PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db` |

## Database Setup

The database configuration is in `src/server/database.ts`.

### Development

No manual setup required - the database and tables are automatically created when you run:

```bash
pnpm run dev:shopiverse
```

### Production

1. Set `NODE_ENV=production`
2. Provide `DATABASE_URL` with your Neon connection string
3. Run SQL migrations to create tables (see Production Environment section)
4. Deploy your application

## Entities

The TypeORM entities are located in `src/server/entities/`. Currently includes:

- **Product**: Stores product information including title, description, price, quantity, etc.

### Product Entity Schema

```typescript
{
  id: string (primary key)
  user_id: string
  title: string
  description: string (optional)
  image: string (optional)
  category: string (optional)
  quantity: number
  price: number
  created_at: Date (auto-generated)
  updated_at: Date (auto-updated)
}
```

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
- TODO: Add database migrations for production deployments
- TODO: Implement connection pooling for better performance

## Troubleshooting

### SQLite Issues

- Ensure you have write permissions in `apps/shopiverse/` directory
- Delete `database.sqlite` file and restart if corrupted

### Neon Issues

- Verify `DATABASE_URL` is correctly formatted
- Check SSL/TLS connection settings
- Ensure your IP is not blocked by Neon's firewall
- Verify database tables exist (run migrations)
