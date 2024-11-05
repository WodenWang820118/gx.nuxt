<template>
  <div class="grid h-16 place-items-center">
    <div class="border p-4">
      <form @submit.prevent="handleSubmit">
        <div ref="paymentRef">
          <!--Stripe.js injects the Payment Element-->
        </div>
        <button ref="submitButtonRef">
          <div
            ref="spinnerRef"
            class="spinner hidden"
          ></div>
          <span ref="buttonTextRef">Pay now</span>
        </button>
        <div
          ref="paymentMessageRef"
          class="hidden"
        ></div>
      </form>
    </div>
  </div>
</template>

<script src="./Checkout.script.ts"></script>
<style src="./Checkout.style.scss"></style>
