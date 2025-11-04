import { Product } from '../../utils/product.interface';
import { useAuthStore } from '../../stores/auth';

export function useProductLogic() {
  const product = ref<Product | null>(null);
  const authStore = useAuthStore();
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
    if (authStore.user) {
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
