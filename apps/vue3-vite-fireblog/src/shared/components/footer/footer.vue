<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'home' }"
            >FireBlogs</router-link
          >
          <ul>
            <li>
              <a href="#"
                ><img
                  src="../../../assets/icons/youtube-brands.svg"
                  class="svg-icon"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  src="../../../assets/icons/twitter-brands.svg"
                  class="svg-icon"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  src="../../../assets/icons/instagram-brands.svg"
                  class="svg-icon"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  src="../../../assets/icons/linkedin-brands.svg"
                  class="svg-icon"
              /></a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'blogs' }"
              >Blogs</router-link
            >
            <router-link v-if="user" class="link" :to="{ name: 'create-post' }"
              >Create Post</router-link
            >
            <router-link v-if="!user" class="link" :to="{ name: 'login' }"
              >Login In / Register</router-link
            >
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2024 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useUserStore } from "../../../stores/users";

export default defineComponent({
  name: "footer-vue",
  setup() {
    const store = useUserStore();
    return {
      user: computed(() => store.user),
    };
  },
});
</script>

<style lang="scss" src="./footer.scss"></style>
