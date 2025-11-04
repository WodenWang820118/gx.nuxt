import { defineEventHandler } from 'h3';
import { getDataSource } from '../../database';
import { Product } from '../../entities/Product';

export default defineEventHandler(async () => {
  const dataSource = await getDataSource();
  const productRepository = dataSource.getRepository(Product);
  const products = await productRepository.find();
  return products;
});
