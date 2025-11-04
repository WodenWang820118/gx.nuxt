<template>
  <div class="blog-card">
    <div v-show="editPost" class="icons">
      <div @click="editBlog" class="icon">
        <img class="edit" src="../../../assets/icons/edit-regular.svg" alt="" />
      </div>
      <div @click="deletePost" class="icon">
        <img
          class="delete"
          src="../../../assets/icons/trash-regular.svg"
          alt=""
        />
      </div>
    </div>
    <img class="image" :src="card.blogCoverPhoto" alt="" />
    <div class="info">
      <h4>{{ card.blogTitle }}</h4>
      <h6>
        Posted on:
        {{
          new Date(card.blogDate).toLocaleString("en-us", { dateStyle: "long" })
        }}
      </h6>
      <router-link
        class="link"
        :to="{ name: 'view-blog', params: { blogId: card.blogId } }"
      >
        View The Post
        <img class="arrow" src="../../../assets/icons/arrow-right-light.svg" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { computed, defineComponent } from "vue";
import { usePostStore } from "../../../stores/posts";

export default defineComponent({
  name: "blog-cards",
  props: {
    card: {
      type: Object as () => {
        blogId: string;
        blogHTML: string;
        blogCoverPhoto: string;
        blogTitle: string;
        blogDate: string;
        blogCoverPhotoName: string;
      },
      required: true,
    },
  },
  setup(props) {
    const store = usePostStore();
    const router = useRouter();

    async function editBlog() {
      await router.push({
        name: "edit-blog",
        params: {
          blogId: props.card.blogId,
        },
      });
    }

    return {
      editPost: computed(() => {
        return store.editPost;
      }),
      deletePost: async () => {
        await store.deletePostFromDatabase(props.card.blogId);
      },
      editBlog: async () => await editBlog(),
    };
  },
});
</script>

<style lang="scss" src="./blog-cards.scss"></style>
