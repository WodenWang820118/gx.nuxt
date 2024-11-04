<template>
  <div>
    <div class="relative overflow-x-auto">
      <br />
      <table
        class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400"
      >
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Product name
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Price
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Category
            </th>
            <th
              scope="col"
              class="px-6 py-3"
            >
              Image
            </th>
          </tr>
        </thead>
        <tbody
          v-for="product in cart"
          v-if="cart"
          :key="product.id"
        >
          <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {{ product.title }}
            </th>
            <td class="px-6 py-4">
              {{ product.price }}
            </td>
            <td class="px-6 py-4">
              {{ product.category }}
            </td>
            <td class="px-6 py-4">
              <img
                width="50px"
                :src="product.image"
                alt="product image"
              />
            </td>
            <td class="px-6 py-4">
              <button @click="removeFromCart(product)">
                <Icon
                  name="fa:remove"
                  size="25"
                  color="red"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <br /><br />

      <div
        class="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow
          dark:border-gray-700 dark:bg-gray-800"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >Total</h5
        >
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"
          >${{ calcTotalCart() }}</p
        >
        <button
          class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm
            font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4
            focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
            dark:focus:ring-blue-800"
        >
          @click="navigateToCheckout" Checkout
          <svg
            class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const cart = useCart();
  const calcTotalCart = () => {
    let total = 0;
    cart.value.forEach((product) => {
      total += product.price;
    });

    return total;
  };

  const removeFromCart = (product) => {
    const productIndex = cart.value.findIndex((item) => item.id === product.id);
    cart.value.splice(productIndex, 1);
  };

  const navigateToCheckout = async () => {
    if (!cart.value.length) {
      alert('Cart is empty');
      return;
    }

    await navigateTo('/checkout');
  };
</script>
