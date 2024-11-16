import { Product } from '../../utils/product.interface';
import { useCart } from '../../composables/state';

export function useCartLogic() {
  const { cart } = useCart();
  const calcTotalCart = () => {
    let total = 0;
    cart.value.forEach((product: Product) => {
      total += product.price;
    });

    return total;
  };

  const removeFromCart = (product: Product) => {
    const productIndex = cart.value.findIndex((item) => item.id === product.id);
    cart.value.splice(productIndex, 1);
  };

  const decreaseQuantity = (product: CartItem) => {
    const item = cart.value.findIndex((item) => item.id === product.id);
    if (cart.value[item].quantity > 1) {
      cart.value[item].quantity--;
    } else {
      cart.value.splice(item, 1);
    }
  };

  const increaseQuantity = (product: CartItem) => {
    console.log('product: ', product);
    const item = cart.value.findIndex((item) => item.id === product.id);
    console.log('item: ', item);
    cart.value[item].quantity++;
  };

  const navigateToCheckout = async () => {
    if (!cart.value.length) {
      alert('Cart is empty');
      return;
    }

    await navigateTo('/checkout');
  };

  return {
    calcTotalCart,
    removeFromCart,
    navigateToCheckout,
    decreaseQuantity,
    increaseQuantity,
    cart
  };
}
