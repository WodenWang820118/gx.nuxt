import { ref, onMounted } from 'vue';
import { useCart } from '../../composables/state';
import { CheckoutService } from '../../services/CheckoutService';

export function useCheckoutLogic() {
  const paymentRef = ref(null);
  const submitButtonRef = ref(null);
  const spinnerRef = ref(null);
  const buttonTextRef = ref(null);
  const paymentMessageRef = ref(null);
  const { cart } = useCart();
  const user = useSupabaseUser();
  const checkoutService = new CheckoutService();

  const calcTotalCart = () => {
    return cart.value.reduce((acc, item) => acc + item.price, 0);
  };

  onMounted(async () => {
    // Initialize any required payment setup
    if (!user.value) {
      showMessage('Please login to proceed with checkout');
      return;
    }
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!user.value) {
        throw new Error('User not authenticated');
      }

      // Prepare items for checkout
      const checkoutItems = cart.value.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
        price: item.price
      }));

      console.log('Checkout items:', checkoutItems);

      // Process checkout using CheckoutService
      const order = await checkoutService.processCheckout(
        user.value.id,
        checkoutItems
      );

      if (order) {
        showMessage('Order placed successfully!');
        // Clear cart or redirect to success page
        cart.value = [];
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showMessage(error.message || 'Error processing checkout');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      // Implement order status check if needed

      const orders = await checkoutService.orderServiceInstance.getOrdersByUser(
        user.value.id
      );
      return orders[orders.length - 1]?.status;
    } catch (error) {
      console.error('Status check error:', error);
      return null;
    }
  };

  const showMessage = (messageText: string) => {
    if (paymentMessageRef.value) {
      paymentMessageRef.value.classList.remove('hidden');
      paymentMessageRef.value.textContent = messageText;

      setTimeout(() => {
        paymentMessageRef.value.classList.add('hidden');
        paymentMessageRef.value.textContent = '';
      }, 4000);
    }
  };

  const setLoading = (isLoading: boolean) => {
    if (submitButtonRef.value && spinnerRef.value && buttonTextRef.value) {
      submitButtonRef.value.disabled = isLoading;

      if (isLoading) {
        spinnerRef.value.classList.remove('hidden');
        buttonTextRef.value.classList.add('hidden');
      } else {
        spinnerRef.value.classList.add('hidden');
        buttonTextRef.value.classList.remove('hidden');
      }
    }
  };

  return {
    paymentRef,
    submitButtonRef,
    spinnerRef,
    buttonTextRef,
    paymentMessageRef,
    handleSubmit,
    calcTotalCart,
    checkStatus
  };
}
