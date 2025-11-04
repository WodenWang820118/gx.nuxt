<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.blogTitle }}</h2>
        <h2 v-else>{{ post.blogTitle }}</h2>
        <p v-if="post.welcomeScreen">{{ post.blogHTML }}</p>
        <p class="content-preview" v-else v-html="compiledMarkdown"></p>
        <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
          Login/Register<img
            class="arrow-light"
            src="../../../assets/icons/arrow-right-light.svg"
          />
        </router-link>
        <router-link
          class="link"
          v-else
          :to="{ name: 'view-blog', params: { blogId: post.blogId } }"
        >
          View The Post<img
            class="arrow"
            src="../../../assets/icons/arrow-right-light.svg"
          />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img
        v-if="post.welcomeScreen"
        src="../../../assets/blog-photos/coding.jpg"
        alt=""
      />
      <img v-else :src="post.blogCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useUserStore } from "../../../stores/users";
import { marked } from "marked";

export default defineComponent({
  name: "blog-post",
  props: {
    post: {
      type: Object as () => {
        blogId: string;
        blogHTML: string;
        blogCoverPhoto: string;
        blogTitle: string;
        blogDate: string;
        blogCoverPhotoName: string;
        welcomeScreen?: boolean;
      },
      required: true,
    },
  },
  setup(props) {
    const store = useUserStore();
    return {
      user: computed(() => store.user),
      compiledMarkdown: computed(() => marked(props.post.blogHTML)),
    };
  },
});
</script>

<style lang="scss" src="./blog-post.scss"></style>
