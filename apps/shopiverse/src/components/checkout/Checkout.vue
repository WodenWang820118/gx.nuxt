<template>
  <div class="grid h-16 place-items-center">
    <div class="border p-4">
      <form @submit.prevent="handleSubmit">
        <div ref="paymentRef"> </div>
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

<script setup lang="ts">
  import { useCheckoutLogic } from './checkout.script';
  const {
    handleSubmit,
    paymentRef,
    submitButtonRef,
    spinnerRef,
    buttonTextRef,
    paymentMessageRef
  } = useCheckoutLogic();
</script>
<style src="./checkout.scss"></style>
