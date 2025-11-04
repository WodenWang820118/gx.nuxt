import { defineEventHandler, readBody } from 'h3';
import { getDataSource } from '../../database';
import { Product } from '../../entities/Product';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Extract actual values from the complex objects
    const extractValue = (obj: any) => {
      if (typeof obj === 'string') {
        try {
          const parsed = JSON.parse(obj);
          return parsed._value || parsed;
        } catch {
          return obj;
        }
      }
      return obj?._value || obj;
    };

    // Prepare the product data
    const productData: Partial<Product> = {
      id: String(extractValue(body.id) || crypto.randomUUID()),
      user_id: String(extractValue(body.user_id) || ''),
      title: String(extractValue(body.title) || ''),
      description: String(extractValue(body.description) || ''),
      image: String(extractValue(body.image) || ''),
      category: String(extractValue(body.category) || ''),
      price: parseInt(extractValue(body.price) || '0', 10),
      quantity: parseInt(extractValue(body.quantity) || '0', 10)
    };

    console.log('Creating product:', productData);

    const dataSource = await getDataSource();
    const productRepository = dataSource.getRepository(Product);
    const product = productRepository.create(productData);
    const savedProduct = await productRepository.save(product);

    return {
      success: true,
      data: savedProduct
    };
  } catch (err) {
    console.error('Error creating product:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred'
    };
  }
});
