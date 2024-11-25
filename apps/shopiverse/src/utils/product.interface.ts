export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  user_id: string;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at?: string;
  updated_at?: string;
}
