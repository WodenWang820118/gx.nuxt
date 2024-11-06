import { Product } from '../utils/product.interface';

export const useCart = () => {
  return useState('cart', () => {
    return [] as Product[];
  });
};
