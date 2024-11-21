import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';
import { serverSupabaseClient } from '#supabase/server';
import { Product } from '~/utils/product.interface';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  // TODO: enable RLS to let users create products after authentication
  // product should be having a user_id column as a foreign key
  const supabase = await serverSupabaseClient<Product>(event);
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
    const productData: Product = {
      id: String(extractValue(body.id) || crypto.randomUUID()),
      user_id: String(extractValue(body.user_id) || ''),
      title: String(extractValue(body.title) || ''),
      description: String(extractValue(body.description) || ''),
      image: String(extractValue(body.image) || ''),
      category: String(extractValue(body.category) || ''),
      price: parseInt(extractValue(body.price) || '0', 10),
      quantity: parseInt(extractValue(body.quantity) || '0', 10)
    };

    // First, save to Supabase (source of truth)
    const { data, error } = await supabase
      .from('Products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;

    // Then, cache in Prisma
    const prismaProduct = await prisma.products.create({
      data: productData
    });

    return {
      success: true,
      data: data,
      cached: prismaProduct
    };
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
