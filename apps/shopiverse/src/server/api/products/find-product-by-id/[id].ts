import { defineEventHandler, getRouterParam, createError } from 'h3';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const productID = getRouterParam(event, 'id');

  if (!productID) {
    throw createError({
      statusCode: 400,
      message: 'Product ID is required'
    });
  }

  const product = await prisma.products.findFirst({
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
