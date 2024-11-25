import { Product } from '../utils/product.interface';

export class ProductService {
  private supabase = useSupabaseClient();

  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('products')
      .select('quantity')
      .eq('id', productId)
      .single();

    if (error) throw error;
    return data.quantity >= quantity;
  }
}
