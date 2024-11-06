import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Read the request body instead of query params
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

    const newProduct = await prisma.products.create({
      data: {
        id: String(extractValue(body.id) || crypto.randomUUID()),
        title: String(extractValue(body.title) || ''),
        description: String(extractValue(body.description) || ''),
        image: String(extractValue(body.image) || ''),
        category: String(extractValue(body.category) || ''),
        price: parseInt(extractValue(body.price) || '0', 10)
      }
    });

    return { success: true, data: newProduct };
  } catch (err) {
    console.error('Error creating product:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred'
    };
  } finally {
    await prisma.$disconnect();
  }
});
