import { ref, onMounted } from 'vue';
import { useCart } from '../../composables/state';

export function useCheckoutLogic() {
  const config = useRuntimeConfig();
  const { stripePK } = config.public;
  let stripe;
  let elements;
  let clientSecret;

  // Template refs
  const paymentRef = ref(null);
  const submitButtonRef = ref(null);
  const spinnerRef = ref(null);
  const buttonTextRef = ref(null);
  const paymentMessageRef = ref(null);

  const cart = useCart();

  const calcTotalCart = () => {
    let total = 0;
    cart.value.forEach((product) => {
      total += product.price;
    });
    return total * 100;
  };

  onMounted(async () => {
    stripe = await stripe(stripePK);
    const initialize = async () => {
      const { data } = await useFetch('/api/stripe/paymentintent', {
        method: 'post',
        body: {
          amount: calcTotalCart()
        }
      });

      clientSecret = data.value;
      console.log(clientSecret);

      const appearance = {
        theme: 'stripe'
      };

      const paymentElementOptions = {
        layouts: 'tabs'
      };

      elements = stripe.elements({
        appearance,
        clientSecret
      });

      const paymentElement = elements.create('payment', paymentElementOptions);
      paymentElement.mount(paymentRef.value);
    };

    initialize();
    checkStatus();
  });

  const handleSubmit = async () => {
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://shopiversee.netlify.app/payment-success'
      }
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      showMessage(error.message);
    } else {
      showMessage('An unexpected error occurred.');
    }

    setLoading(false);
  };

  const checkStatus = async () => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case 'succeeded':
        showMessage('Payment succeeded!');
        break;
      case 'processing':
        showMessage('Your payment is processing.');
        break;
      case 'requires_payment_method':
        showMessage('Your payment was not successful, please try again.');
        break;
      default:
        showMessage('Something went wrong.');
        break;
    }
  };

  const showMessage = (messageText) => {
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
    handleSubmit
  };
}
