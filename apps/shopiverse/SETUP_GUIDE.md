# Shopiverse Database Environment Setup Guide

## Overview

This guide walks you through setting up the Shopiverse application with either SQLite3 (development) or Neon PostgreSQL (production).

## Architecture

```
┌─────────────────────────────────────────┐
│         Shopiverse Application          │
└─────────────────┬───────────────────────┘
                  │
                  │ NODE_ENV check
                  │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────────┐
│  SQLite3 (Dev)  │  │ Neon (Production)│
│                 │  │                  │
│ • Local file    │  │ • Cloud hosted   │
│ • Auto-sync     │  │ • SSL/TLS        │
│ • Zero config   │  │ • Scalable       │
└─────────────────┘  └──────────────────┘
```

## Development Setup (SQLite3)

### Prerequisites

- Node.js 18+ installed
- pnpm installed

### Steps

1. **Navigate to project root:**

   ```bash
   cd c:/software-dev/gx.nuxt
   ```

2. **Copy environment file:**

   ```bash
   cp apps/shopiverse/.env.example apps/shopiverse/.env
   ```

3. **Configure for development:**

   ```bash
   # Edit apps/shopiverse/.env
   NODE_ENV=development
   ```

4. **Install dependencies (if not already done):**

   ```bash
   pnpm install
   ```

5. **Start development server:**

   ```bash
   pnpm run dev:shopiverse
   ```

6. **Verify database creation:**
   - Check for `apps/shopiverse/database.sqlite` file
   - Console should show: "✅ Database connection initialized (SQLite3)"

### Testing

```bash
# The app should be running at http://localhost:4200
# Test API endpoints:
curl http://localhost:4200/api/products
```

## Production Setup (Neon PostgreSQL)

### Prerequisites

- Neon account ([neon.tech](https://neon.tech))
- Node.js 18+ installed
- pnpm installed

### Steps

#### 1. Create Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Click "New Project"
3. Choose a project name (e.g., "shopiverse-prod")
4. Select a region closest to your deployment
5. Click "Create Project"

#### 2. Get Connection String

1. In Neon dashboard, click on your project
2. Go to "Connection Details"
3. Copy the connection string (PostgreSQL format)
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

#### 3. Configure Environment

```bash
# Edit apps/shopiverse/.env
NODE_ENV=production
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
```

#### 4. Run Database Migration

**Option A: Using Neon SQL Editor**

1. Open Neon dashboard → SQL Editor
2. Copy contents from `apps/shopiverse/migrations/001_create_products_table.sql`
3. Paste and run the SQL

**Option B: Using psql CLI**

```bash
psql "postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require" \
  -f apps/shopiverse/migrations/001_create_products_table.sql
```

#### 5. Build and Deploy

```bash
# Build for production
NODE_ENV=production pnpm run build-shopiverse

# Deploy (example for Vercel)
vercel --prod
```

#### 6. Verify Production Database

```bash
# Test connection (replace with your URL)
psql "your-database-url" -c "SELECT * FROM products LIMIT 1;"
```

## Environment Variables

### Required for All Environments

| Variable   | Description      | Example                       |
| ---------- | ---------------- | ----------------------------- |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Required for Production Only

| Variable       | Description                       | Example                                    |
| -------------- | --------------------------------- | ------------------------------------------ |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db` |

## Switching Between Environments

### Development → Production

1. Update `.env`:

   ```bash
   NODE_ENV=production
   DATABASE_URL=your-neon-url
   ```

2. Run migrations (if not done)
3. Restart server

### Production → Development

1. Update `.env`:

   ```bash
   NODE_ENV=development
   # DATABASE_URL not needed
   ```

2. Restart server
3. SQLite file will be created automatically

## Database Differences

| Feature     | SQLite3 (Dev) | Neon PostgreSQL (Prod)       |
| ----------- | ------------- | ---------------------------- |
| Location    | Local file    | Cloud hosted                 |
| Auto-sync   | ✅ Enabled    | ❌ Disabled (use migrations) |
| SSL         | Not required  | ✅ Required                  |
| Scalability | Limited       | High                         |
| Backups     | Manual        | Automatic                    |
| Cost        | Free          | Free tier available          |
| Setup time  | Instant       | ~5 minutes                   |

## Troubleshooting

### Common Issues

#### Issue: "Database connection failed"

**Development (SQLite):**

- Check file permissions in `apps/shopiverse/` directory
- Delete `database.sqlite` and restart

**Production (Neon):**

- Verify `DATABASE_URL` format is correct
- Check SSL mode is set to `require`
- Ensure database exists in Neon dashboard

#### Issue: "Table 'products' doesn't exist"

**Development:**

- Should auto-create. Delete `database.sqlite` and restart

**Production:**

- Run migration SQL from `migrations/001_create_products_table.sql`

#### Issue: TypeScript decorator errors

These are expected in the entity files and don't affect runtime:

```
Unable to resolve signature of property decorator...
```

This is a known TypeORM + TypeScript issue and can be safely ignored.

## Best Practices

### Development

- ✅ Use SQLite3 for fast iteration
- ✅ Commit `.env.example`, never commit `.env`
- ✅ Use `synchronize: true` for automatic schema updates
- ✅ Keep database file in gitignore

### Production

- ✅ Use Neon PostgreSQL for scalability
- ✅ Always use migrations (`synchronize: false`)
- ✅ Enable SSL/TLS
- ✅ Use connection pooling
- ✅ Set up automated backups
- ✅ Monitor database performance

## Database Management Commands

### SQLite (Development)

```bash
# View database schema
sqlite3 apps/shopiverse/database.sqlite ".schema"

# View all products
sqlite3 apps/shopiverse/database.sqlite "SELECT * FROM products;"

# Reset database
rm apps/shopiverse/database.sqlite
pnpm run dev:shopiverse
```

### Neon (Production)

```bash
# Connect to database
psql "your-database-url"

# View all products
psql "your-database-url" -c "SELECT * FROM products;"

# Backup database
pg_dump "your-database-url" > backup.sql

# Restore database
psql "your-database-url" < backup.sql
```

## Support Resources

- **Neon Documentation**: https://neon.tech/docs
- **TypeORM Documentation**: https://typeorm.io/
- **Nuxt 3 Documentation**: https://nuxt.com/docs

## Next Steps

After successful setup:

1. ✅ Test API endpoints
2. ✅ Verify database connectivity
3. ✅ Set up monitoring (optional)
4. ✅ Configure automatic backups (production)
5. ✅ Implement authentication
6. ✅ Add Order/OrderItem entities
