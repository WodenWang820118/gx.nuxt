import { OrderItem } from '../utils/product.interface';
import { v4 as uuidv4 } from 'uuid';
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
    const orderItems: OrderItem[] = items.map((item) => ({
      id: uuidv4(),
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price,
      subtotal: item.price * item.quantity
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
