import { defineEventHandler, getQuery } from 'h3';
import { getDataSource } from '../../database';
import { Product } from '../../entities/Product';

export default defineEventHandler(async (event) => {
  const dataSource = await getDataSource();
  const productRepository = dataSource.getRepository(Product);

  // Get query parameters for pagination
  const query = getQuery(event);
  const page = Number.parseInt(query.page as string) || 1;
  const limit = Number.parseInt(query.limit as string) || 12;
  const skip = (page - 1) * limit;

  // Get total count
  const total = await productRepository.count();

  // Get paginated products
  const products = await productRepository.find({
    skip,
    take: limit
  });

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
});
