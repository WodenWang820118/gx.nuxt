import { defineEventHandler, getRouterParam, createError } from 'h3';
import { getDataSource } from '../../../database';
import { Product } from '../../../entities/Product';

export default defineEventHandler(async (event) => {
  const productID = getRouterParam(event, 'id');
  if (!productID) {
    throw createError({
      statusCode: 400,
      message: 'Product ID is required'
    });
  }

  const dataSource = await getDataSource();
  const productRepository = dataSource.getRepository(Product);
  const product = await productRepository.findOne({
    where: {
      id: String(productID)
    }
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found'
    });
  }

  return product;
});
