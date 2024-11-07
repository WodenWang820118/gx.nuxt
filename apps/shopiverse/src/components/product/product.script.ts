import { Product } from '../../utils/product.interface';

export function useProductLogic() {
  const route = useRoute();
  const id = route.params.id;
  const product = ref<Product | null>(null);
  const user = useSupabaseUser();
  const cart = useCart();

  const alreadyInCart = (cartState: Product[], productToCheck: Product) => {
    return cartState.some((productInCart: Product) => {
      return productInCart.id === productToCheck.id;
    });
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const addToCart = (product: Product) => {
    if (user.value) {
      cart.value.push(product);
    } else {
      alert('Log in to start adding products to cart');
    }
  };

  return {
    product,
    getRandomRating,
    addToCart,
    alreadyInCart
  };
}
