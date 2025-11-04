import { Product } from '../utils/product.interface';

// Simplified ProductService using server API (for demonstration purposes)
export class ProductService {
  async getProduct(id: string): Promise<Product | null> {
    const data = await $fetch<Product>(
      `/api/products/find-product-by-id/${id}`
    );
    return data;
  }

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const product = await this.getProduct(productId);
    return product ? product.quantity >= quantity : false;
  }
}
