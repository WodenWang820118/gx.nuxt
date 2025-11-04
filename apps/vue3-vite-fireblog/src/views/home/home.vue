<template>
  <navigation :isUserLogin="isUserLogin" :isAdmin="isAdmin" />
  <div class="home">
    <blog-post v-if="!user" :post="welcomeScreen" />
    <!-- the post props binding the post used in v-for loop -->
    <blog-post
      :post="post"
      v-for="(post, index) in blogPostsFeed"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <blog-cards
            v-for="(card, index) in blogPostsCards"
            :card="card"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: 'register' }">
          Register For FireBlogs
          <img
            class="arrow-light"
            src="../../assets/icons/arrow-right-light.svg"
          />
        </router-link>
      </div>
    </div>
  </div>
  <footer-vue v-if="!isUserLogin" />
</template>

<script lang="ts">
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
import BlogPost from "./components/blog-post.vue";
import BlogCards from "../../shared/components/blog-cards/blog-cards.vue";
import { useUserStore } from "../../stores/users";
import { usePostStore } from "../../stores/posts";
import { ref, computed, defineComponent, onBeforeMount } from "vue";
import { auth } from "../../shared/firebase/firebase-auth";

export default defineComponent({
  name: "home",
  components: {
    "blog-post": BlogPost,
    "blog-cards": BlogCards,
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const userStore = useUserStore();
    const postStore = usePostStore();
    const welcomeScreen = ref({
      blogId: "welcome",
      blogHTML:
        "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
      blogCoverPhoto: "coding",
      blogTitle: "Welcome!",
      blogDate: "2024-05-17",
      blogCoverPhotoName: "coding",
      welcomeScreen: true,
    });

    async function checkUserState() {
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          let email = currentUser.email;
          //@ts-ignore
          email === import.meta.env.VITE_APP_ADMINEMAIL
            ? userStore.setIsAdmin(true)
            : userStore.setIsAdmin(false);
          userStore.setUser(currentUser);
          userStore.setUserLogin(true);
          userStore.setIsAdmin(true);
        } else {
          userStore.setUserLogin(false);
        }
      });
    }

    onBeforeMount(async () => {
      // once the user state is fetched, use the store to manage the user state
      await checkUserState();
      await postStore.getPost();
    });

    return {
      user: computed(() => userStore.user),
      blogPostsFeed: computed(() => postStore.blogPostsFeed()),
      blogPostsCards: computed(() => postStore.blogPostsCards()),
      isUserLogin: computed(() => userStore.isUserLogin),
      isAdmin: computed(() => userStore.isAdmin),
      welcomeScreen,
    };
  },
});
</script>

<style lang="scss" src="./home.scss"></style>
