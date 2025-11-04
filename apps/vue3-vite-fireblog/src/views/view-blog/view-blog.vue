<template>
  <navigation :isUserLogin="isUserLogin" :isAdmin="isAdmin" />
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ currentBlog.blogTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(currentBlog.blogDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img class="cover-photo" :src="currentBlog.blogCoverPhoto" alt="" />
      <VueShowdown :markdown="markdownSrc" />
    </div>
  </div>
  <footer-vue />
</template>

<script lang="ts">
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
import { usePostStore } from "../../stores/posts";
import { ref, onMounted, defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { PostService } from "../../shared/services/post.service";
import { useUserStore } from "../../stores/users";

export default defineComponent({
  name: "view-blog",
  components: {
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();
    const route = useRoute();
    const postService = new PostService();
    const currentBlog = ref();
    const reload = ref(true);
    const markdownSrc = ref();

    async function getRoutedPost() {
      // if there's already a post, use it instead of fetching it from the backend
      const cachedPost = postStore.getCertainPost(route.params.blogId);

      currentBlog.value = cachedPost
        ? cachedPost
        : await postService.getPostById(route.params.blogId);
      console.log(currentBlog.value);
      markdownSrc.value = currentBlog.value.blogHTML;
    }

    onMounted(async () => {
      await getRoutedPost();
    });

    return {
      reload,
      currentBlog,
      markdownSrc,
      isUserLogin: computed(() => userStore.isUserLogin),
      isAdmin: computed(() => userStore.isAdmin),
    };
  },
});
</script>

<style lang="scss" src="./view-blog.scss"></style>
