import { OrderItemService } from './OrderItemService';
import { OrderService } from './OrderService';
import { ProductService } from './ProductService';

export class CheckoutService {
  private productService: ProductService;
  private orderService: OrderService;
  private orderItemService: OrderItemService;

  constructor() {
    this.productService = new ProductService();
    this.orderService = new OrderService();
    this.orderItemService = new OrderItemService();
  }

  get productServiceInstance() {
    return this.productService;
  }

  get orderServiceInstance() {
    return this.orderService;
  }

  get orderItemServiceInstance() {
    return this.orderItemService;
  }

  async processCheckout(
    userId: string,
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>
  ) {
    // Validate stock for all items
    for (const item of items) {
      const hasStock = await this.productService.checkStock(
        item.product_id,
        item.quantity
      );
      if (!hasStock) {
        throw new Error(`Insufficient stock for product ${item.product_id}`);
      }
    }

    // Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = await this.orderService.createOrder(userId, total);

    // Create order items
    await this.orderItemService.createOrderItems(order.id, items);

    // Update order status
    await this.orderService.updateOrderStatus(order.id, 'completed');

    return order;
  }
}
