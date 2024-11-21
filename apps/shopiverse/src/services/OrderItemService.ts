import { OrderItem } from '../utils/product.interface';

export class OrderItemService {
  private supabase = useSupabaseClient();

  async createOrderItems(
    orderId: string,
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>
  ): Promise<OrderItem[]> {
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { data, error } = await this.supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (error) throw error;
    return data;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const { data, error } = await this.supabase
      .from('order_items')
      .select(
        `
        *,
        products (*)
      `
      )
      .eq('order_id', orderId);

    if (error) throw error;
    return data;
  }
}
