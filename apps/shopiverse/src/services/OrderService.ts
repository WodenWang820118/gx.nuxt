import { Order } from '../utils/product.interface';

export class OrderService {
  private supabase = useSupabaseClient();

  async createOrder(userId: string, total: number): Promise<Order> {
    const { data, error } = await this.supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: total,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    const { error } = await this.supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }
}
