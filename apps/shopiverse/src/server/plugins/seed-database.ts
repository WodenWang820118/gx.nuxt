import { getDataSource } from '../database';
import { Product } from '../entities/Product';
import { mockProducts } from '../seed-data';

/**
 * Seed the database with mock products on server startup (development only)
 */
export default defineNitroPlugin(async () => {
  // Only seed in development mode
  const isDevelopment =
    process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

  if (!isDevelopment) {
    console.log('⏭️  Skipping database seeding (production mode)');
    return;
  }

  try {
    console.log('🌱 Starting database seeding...');

    const dataSource = await getDataSource();
    const productRepository = dataSource.getRepository(Product);

    // Check if products already exist
    const existingCount = await productRepository.count();

    if (existingCount > 0) {
      console.log(
        `ℹ️  Database already contains ${existingCount} products. Skipping seed.`
      );
      return;
    }

    // Insert mock products
    console.log(`📦 Inserting ${mockProducts.length} mock products...`);

    for (const productData of mockProducts) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
    }

    const finalCount = await productRepository.count();
    console.log(
      `✅ Database seeded successfully! Total products: ${finalCount}`
    );
    console.log(
      `📊 Categories included: Electronics, Clothing, Books, Home & Garden, Sports, Toys`
    );
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    // Don't throw - allow server to continue even if seeding fails
  }
});
