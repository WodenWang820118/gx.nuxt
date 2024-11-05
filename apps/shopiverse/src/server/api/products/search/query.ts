import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const queryItem = query?.input || '';

  const safeQueryItem = String(queryItem);
  const items = await prisma.products.findMany({
    where: {
      OR: [
        {
          title: {
            contains: safeQueryItem,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: safeQueryItem,
            mode: 'insensitive'
          }
        }
      ]
    }
  });

  return items;
});
