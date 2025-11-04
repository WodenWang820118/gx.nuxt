import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from './entities/Product';

// Determine database configuration based on environment
const isDevelopment =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
const databaseUrl = process.env.DATABASE_URL;

// Configure database based on environment
let dataSourceOptions: DataSourceOptions;

if (isDevelopment) {
  // Development: Use SQLite3
  console.log('🔧 Using SQLite3 for development');
  dataSourceOptions = {
    type: 'sqlite',
    database: './apps/shopiverse/database.sqlite',
    synchronize: true, // Auto-create tables (for demo purposes only!)
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: []
  };
} else {
  // Production: Use Neon PostgreSQL
  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is required for production'
    );
  }
  console.log('🚀 Using Neon PostgreSQL for production');
  dataSourceOptions = {
    type: 'postgres',
    url: databaseUrl,
    synchronize: false, // Don't auto-create tables in production
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
    ssl: {
      rejectUnauthorized: false // Required for Neon
    }
  };
}

export const AppDataSource = new DataSource(dataSourceOptions);

let isInitialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log(
        `✅ Database connection initialized (${isDevelopment ? 'SQLite3' : 'PostgreSQL/Neon'})`
      );
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }
  return AppDataSource;
}
