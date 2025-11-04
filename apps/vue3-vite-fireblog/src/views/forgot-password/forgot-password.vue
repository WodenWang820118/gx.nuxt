<template>
  <navigation :isUserLogin="false" />
  <div class="reset-password">
    <modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />
    <loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'login' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <img
              class="icon"
              src="../../assets/icons/envelope-regular.svg"
              alt=""
            />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
  <footer-vue />
</template>

<script lang="ts">
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
import Modal from "../../shared/components/modal/modal.vue";
import Loading from "../../shared/components/loading/loading.vue";
import { defineComponent, ref } from "vue";
import { AuthService } from "../../shared/services/auth.service";

export default defineComponent({
  name: "forgot-password",
  components: {
    modal: Modal,
    loading: Loading,
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const authService = new AuthService();
    const email = ref("");
    const modalActive = ref(false);
    const modalMessage = ref("");
    const loading = ref(false);

    async function resetPassword() {
      try {
        loading.value = true;
        await authService.sendPasswordResetEmail(email.value);
        modalMessage.value = "If your account exists, you will receive a email";
        loading.value = false;
        modalActive.value = true; // then pop out the components/Modal.vue
      } catch (error) {
        modalMessage.value = (error as any).message;
        loading.value = false;
        modalActive.value = true;
      }
    }
    function closeModal() {
      modalActive.value = !modalActive.value;
      email.value = "";
    }
    return {
      email,
      modalActive,
      modalMessage,
      loading,
      resetPassword,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
