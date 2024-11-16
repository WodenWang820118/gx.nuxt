import { Product, CartItem } from '../../utils/product.interface';

export function useProductLogic() {
  const product = ref<Product | null>(null);
  const user = useSupabaseUser();
  const { cart } = useCart();

  const alreadyInCart = (productToCheck: Product) => {
    return cart.value.some((productInCart: CartItem) => {
      return productInCart.id === productToCheck.id;
    });
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const addToCart = (product: CartItem) => {
    if (user.value) {
      cart.value.push({
        ...product,
        quantity: 1
      });
    } else {
      alert('Log in to start adding products to cart');
    }
  };

  return {
    product,
    getRandomRating,
    addToCart,
    alreadyInCart,
    cart
  };
}
