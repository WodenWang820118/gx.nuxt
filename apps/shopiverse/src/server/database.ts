import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './apps/shopiverse/database.sqlite',
  synchronize: true, // Auto-create tables (for demo purposes only!)
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: []
});

let isInitialized = false;

export async function getDataSource(): Promise<DataSource> {
  if (!isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
    console.log('Database connection initialized');
  }
  return AppDataSource;
}
