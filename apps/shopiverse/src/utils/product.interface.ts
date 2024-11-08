export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
