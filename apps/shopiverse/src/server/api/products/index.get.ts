import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  // TODO: query products from the database and use Prisma as the cache ORM
  const products = await prisma.products.findMany();
  return products;
});
