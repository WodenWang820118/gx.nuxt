<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'home' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'blogs' }">Blogs</router-link>
          <router-link
            v-if="isUserLogin && isAdmin"
            class="link"
            :to="{ name: 'create-post' }"
            >Create Post
          </router-link>
          <router-link v-if="!isUserLogin" class="link" :to="{ name: 'login' }"
            >Login/Register
          </router-link>
        </ul>
        <div
          v-if="user"
          class="profile"
          ref="profile"
          @click="toggleProfileMenu"
        >
          <span>{{ profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ profileInitials }}</p>
              <div class="right">
                <p>{{ profileFirstName }}</p>
                <p>{{ profileUsername }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link
                  class="option"
                  :to="{ name: 'profile' }"
                  @click="toggleProfileMenu"
                >
                  <img
                    class="icon"
                    src="../../../assets/icons/user-alt-light.svg"
                    alt=""
                  />
                  <p>Profile</p>
                </router-link>
              </div>
              <div @click="signUserOut" class="option">
                <img
                  class="icon"
                  src="../../../assets/icons/sign-out-alt-regular.svg"
                  alt=""
                />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <img
      @click="toggleMobileNav"
      v-show="mobile"
      src="../../../assets/icons/bars-regular.svg"
      alt=""
      class="menu-icon"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'blogs' }">Blogs</router-link>
        <router-link
          v-if="isUserLogin && isAdmin"
          class="link"
          :to="{ name: 'create-post' }"
          >Create Post</router-link
        >
        <router-link v-if="!isUserLogin" class="link" :to="{ name: 'login' }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted, onBeforeMount } from "vue";
import { AuthService } from "../../services/auth.service";
import { useUserStore } from "../../../stores/users";
import { useRouter } from "vue-router";
import { auth } from "../../firebase/firebase-auth";

export default defineComponent({
  name: "navigation",
  props: {
    isUserLogin: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const authService = new AuthService();
    const profileMenu = ref(false);
    const mobile = ref(false);
    const mobileNav = ref(false);
    const windowWidth = ref(window.innerWidth);
    const profile = ref(null);
    const profileInitials = ref("");
    const profileFirstName = ref("");
    const profileLastName = ref("");
    const profileUsername = ref("");
    const profileEmail = ref("");

    function checkScreen() {
      if (windowWidth.value <= 750) {
        mobile.value = true; // for toggling mobile responsiveness and navigation
        return;
      }
      mobile.value = false;
      mobileNav.value = false;
      return;
    }

    function toggleMobileNav() {
      mobileNav.value = !mobileNav.value;
    }

    function toggleProfileMenu(e: Event) {
      if (e.target === null) return;
      e.stopImmediatePropagation();
      console.log(e.target);
      profileMenu.value = !profileMenu.value;
    }

    // TODO: duplicate code; same as in profile.vue
    function getProfileInfo() {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            await store.getProfileInfo(currentUser.uid);
            store.setUser(currentUser);
            store.setProfileInitials();
            profileInitials.value = store.profileInitials;
            profileFirstName.value = store.profileFirstName;
            profileLastName.value = store.profileLastName;
            profileUsername.value = store.profileUsername;
            profileEmail.value = store.profileEmail;
          } catch (error) {
            console.error(error);
          }
        }
      });
    }

    async function signUserOut() {
      await authService.signUserOut();
      router.push({ name: "home" });
      window.location.reload(); // manually update UI state
    }

    onBeforeMount(() => {
      getProfileInfo();
    });

    onMounted(() => {
      checkScreen();
      profileMenu.value = false;
    });

    return {
      user: computed(() => store.user),
      profileInitials,
      profileFirstName,
      profileLastName,
      profileUsername,
      profileEmail,
      profileMenu,
      profile,
      mobile,
      mobileNav,
      windowWidth,
      toggleProfileMenu,
      toggleMobileNav,
      signUserOut: async () => await signUserOut(),
    };
  },
});
</script>

<style lang="scss" src="./navigation.scss"></style>
