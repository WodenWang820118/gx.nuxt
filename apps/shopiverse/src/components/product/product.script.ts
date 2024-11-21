import { Product } from '../../utils/product.interface';

export function useProductLogic() {
  const product = ref<Product | null>(null);
  const user = useSupabaseUser();
  const { cart } = useCart();

  const alreadyInCart = (productToCheck: Product) => {
    return cart.value.some((productInCart: Product) => {
      return productInCart.id === productToCheck.id;
    });
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const addToCart = (product: Product) => {
    if (user.value) {
      const item = cart.value.find((item) => item.id === product.id);
      cart.value.push({
        ...product,
        quantity: item ? item.quantity + 1 : 1
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
