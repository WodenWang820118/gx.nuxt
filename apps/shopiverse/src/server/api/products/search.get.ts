import { defineEventHandler } from 'h3';
import { getDataSource } from '../../database';
import { Product } from '../../entities/Product';
import { ILike } from 'typeorm';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const queryItem = query?.input || '';

  const safeQueryItem = String(queryItem);
  const dataSource = await getDataSource();
  const productRepository = dataSource.getRepository(Product);

  const items = await productRepository.find({
    where: [
      { title: ILike(`%${safeQueryItem}%`) },
      { description: ILike(`%${safeQueryItem}%`) }
    ]
  });

  return items;
});
