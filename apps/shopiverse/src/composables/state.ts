import { CartItem } from '../utils/product.interface';

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);

  // Cache in Nuxt payload
  const nuxtApp = useNuxtApp();

  onMounted(() => {
    // Try to get from localStorage first
    if (import.meta.client) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          cart.value = JSON.parse(savedCart);
        } catch (e) {
          console.error('Failed to parse cart:', e);
        }
      }
    }
  });

  // Watch for changes and update both payload and localStorage
  watch(
    cart,
    (newCart) => {
      if (import.meta.client) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      // Update Nuxt payload
      nuxtApp.payload.cart = newCart;
    },
    { deep: true }
  );

  return {
    cart
  };
};
