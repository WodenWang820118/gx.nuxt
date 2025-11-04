<template>
  <navigation :isUserLogin="isUserLogin" :isAdmin="isAdmin" />
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit" v-if="isAdmin">
        <span>Toggle Editing Post</span>
        <input
          type="checkbox"
          autocomplete="off"
          @change="updateEditPost(isEdit)"
        />
      </div>
      <blog-cards
        v-for="(card, index) in blogPosts"
        :card="card"
        :key="index"
      />
    </div>
    <div
      class="load-more-container"
      style="display: flex; justify-content: center"
    >
      <button @click="loadMorePosts">Load More Posts</button>
    </div>
  </div>
  <footer-vue v-if="!isUserLogin" />
</template>

<script lang="ts">
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
import BlogCards from "../../shared/components/blog-cards/blog-cards.vue";

import { onBeforeUnmount, computed, ref, defineComponent } from "vue";
import { usePostStore } from "../../stores/posts";
import { useUserStore } from "../../stores/users";

export default defineComponent({
  name: "blogs",
  components: {
    "blog-cards": BlogCards,
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();
    const isEdit = ref(false);

    async function loadMorePosts() {
      await postStore.loadMorePosts();
    }

    onBeforeUnmount(() => {
      postStore.toggleEditPost(false);
    });

    return {
      blogPosts: computed(() => postStore.blogPosts),
      editPost: computed(() => postStore.editPost),
      isEdit,
      updateEditPost: (editState: boolean) => {
        isEdit.value = !editState;
        postStore.toggleEditPost(isEdit.value);
      },
      isAdmin: computed(() => userStore.isAdmin),
      isUserLogin: computed(() => userStore.isUserLogin),
      loadMorePosts,
    };
  },
});
</script>

<style lang="scss" src="./blogs.scss"></style>
