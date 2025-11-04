<template>
  <navigation />
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'register' }"
          >Register</router-link
        >
      </p>
      <h2>Login to FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <img
            class="icon"
            src="../../assets/icons/envelope-regular.svg"
            alt=""
          />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <img
            class="icon"
            src="../../assets/icons/lock-alt-solid.svg"
            alt=""
          />
        </div>
        <div class="error" v-show="isError">{{ errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'forgot-password' }">
        Forgot your password?
      </router-link>
      <button @click.prevent="signIn">Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
  <footer-vue />
</template>

<script lang="ts">
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
import { defineComponent, ref } from "vue";
import { AuthService } from "../../shared/services/auth.service";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "login",
  components: {
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const isError = ref(false);
    const errorMsg = ref("");
    const router = useRouter();
    const authService = new AuthService();

    async function signIn() {
      try {
        const user = await authService.signInWithEmailAndPassword(
          email.value,
          password.value
        );
        if (user) {
          router.push({ name: "home" });
          isError.value = false;
          errorMsg.value = "";
          email.value = "";
          password.value = "";
        } else {
          isError.value = true;
          errorMsg.value = "Invalid email or password";
        }
      } catch (error) {
        isError.value = true;
        errorMsg.value = (error as any).message;
        console.log(errorMsg);
      }
    }

    return {
      email,
      password,
      isError,
      errorMsg,
      signIn,
    };
  },
});
</script>

<style lang="scss" src="./login.scss"></style>
