# Shopiverse Database Quick Reference

## 🚀 Quick Start Commands

### Development (SQLite3)

```bash
# Setup (with automatic mock data seeding)
NODE_ENV=development pnpm run dev:shopiverse

# Database location
./apps/shopiverse/database.sqlite

# Reset database and reseed
rm apps/shopiverse/database.sqlite && pnpm run dev:shopiverse
```

**Mock Data:** On first startup, 25 mock products are automatically seeded across 6 categories: Electronics, Clothing, Books, Home & Garden, Sports, and Toys.

### Production (Neon)

```bash
# Setup
NODE_ENV=production DATABASE_URL="your-neon-url" pnpm run build-shopiverse

# Run migrations first!
psql "your-neon-url" -f apps/shopiverse/migrations/001_create_products_table.sql
```

## 📋 Environment Variables

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
```

## 🔄 Switch Environments

```bash
# Copy example file (first time only)
cp apps/shopiverse/.env.example apps/shopiverse/.env

# Edit .env and change NODE_ENV
# Then restart server
```

## 📊 Database Access

### SQLite (Dev)

```bash
sqlite3 apps/shopiverse/database.sqlite "SELECT * FROM products;"
```

### Neon (Prod)

```bash
psql "$DATABASE_URL" -c "SELECT * FROM products;"
```

## ✅ Verification Checklist

- [ ] `.env` file created from `.env.example`
- [ ] `NODE_ENV` set correctly
- [ ] For production: `DATABASE_URL` configured
- [ ] For production: Migrations run
- [ ] Server starts without errors
- [ ] Database connection logs show correct type
- [ ] API endpoints responding

## 🔍 Console Messages

**Development (Expected):**

```
🔧 Using SQLite3 for development
✅ Database connection initialized (SQLite3)
🌱 Starting database seeding...
📦 Inserting 25 mock products...
✅ Database seeded successfully! Total products: 25
📊 Categories included: Electronics, Clothing, Books, Home & Garden, Sports, Toys
```

**Development (Database Already Seeded):**

```
🔧 Using SQLite3 for development
✅ Database connection initialized (SQLite3)
ℹ️  Database already contains 25 products. Skipping seed.
```

**Production (Expected):**

```
🚀 Using Neon PostgreSQL for production
✅ Database connection initialized (PostgreSQL/Neon)
⏭️  Skipping database seeding (production mode)
```

## 📁 Key Files

| File                                       | Purpose                                  |
| ------------------------------------------ | ---------------------------------------- |
| `src/server/database.ts`                   | Database configuration & switching logic |
| `src/server/entities/Product.ts`           | Product entity schema                    |
| `src/server/seed-data.ts`                  | Mock product data (25 items)             |
| `src/server/plugins/seed-database.ts`      | Auto-seed on dev server start            |
| `.env`                                     | Environment variables (not in git)       |
| `.env.example`                             | Environment template (in git)            |
| `migrations/001_create_products_table.sql` | Production SQL schema                    |
| `README.md`                                | Full documentation                       |
| `SETUP_GUIDE.md`                           | Detailed setup instructions              |

## 🐛 Quick Troubleshooting

| Problem             | Solution                                              |
| ------------------- | ----------------------------------------------------- |
| Connection failed   | Check `DATABASE_URL` format, ensure SSL mode          |
| Table doesn't exist | Run migrations (production) or delete `.sqlite` (dev) |
| Permission denied   | Check write permissions in project directory          |
| TypeScript errors   | Normal for decorators, doesn't affect runtime         |

## 📚 Documentation

- Full setup guide: `SETUP_GUIDE.md`
- Project README: `README.md`
- Neon docs: https://neon.tech/docs
- TypeORM docs: https://typeorm.io/
