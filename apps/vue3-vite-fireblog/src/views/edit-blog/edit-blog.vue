<template>
  <navigation :isUserLogin="isUserLogin" :isAdmin="isAdmin" />
  <div class="create-post">
    <blog-cover-preview v-show="blogPhotoPreview" />
    <loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Change Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpeg"
          />
          <button
            @click="togglePreview"
            class="preview"
            :class="{ 'button-inactive': !blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span v-if="coverPhoto">File Chosen: {{ blogCoverPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <md-editor v-model="text" @upload-image="imageHandler" />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Save changes</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// components
import Navigation from "../../shared/components/navigation/navigation.vue";
import BlogCoverPreview from "../../shared/components/blog-cover-preview/blog-cover-preview.vue";
import Loading from "../../shared/components/loading/loading.vue";
// vue
import { useUserStore } from "../../stores/users";
import { usePostStore } from "../../stores/posts";
import { useRoute, useRouter } from "vue-router";
import {
  ref,
  computed,
  onMounted,
  defineComponent,
  Ref,
  defineAsyncComponent,
} from "vue";
// services
import { DocumentData } from "firebase/firestore";
import { PostService } from "../../shared/services/post.service";

const AsyncMdEditor = defineAsyncComponent(async () => {
  // Dynamically import the component and the CSS
  const [component] = await Promise.all([
    import("md-editor-v3"),
    import("md-editor-v3/lib/style.css").catch(() => {
      console.error("Failed to import the CSS file.");
    }),
  ]);
  return component.MdEditor;
});

export default defineComponent({
  name: "edit-blog",
  components: {
    "blog-cover-preview": BlogCoverPreview,
    loading: Loading,
    "md-editor": AsyncMdEditor,
    navigation: Navigation,
  },
  setup() {
    const userStore = useUserStore();
    const postStore = usePostStore();
    const profileId = computed(() => userStore.profileId);
    const error = ref(false);
    const errorMsg = ref("");
    const coverPhoto: Ref<File | undefined> = ref(undefined);
    const blogTitle = ref("");
    const text = ref("");
    const loading = ref(false);
    const currentBlog: Ref<DocumentData> = ref({} as any);
    const blogPhoto = ref(undefined as any);
    const router = useRouter();
    const route = useRoute();
    const postService = new PostService();

    async function fileChange() {
      console.log("[There's a new photo]");
      // console.log(blogPhoto.value.files[0]);
      coverPhoto.value = await postService.imageCompressionHandler(
        blogPhoto.value.files[0]
      );
      if (!coverPhoto.value) {
        return;
      }

      const fileName = coverPhoto.value.name;
      console.log(`The fileName: ${fileName}`);
      postStore.filenameChange(fileName);
      postStore.createFileURL(URL.createObjectURL(coverPhoto.value));
    }

    async function imageHandler(files: File[]) {
      return await postService.imageHandler(files);
    }

    async function uploadBlog() {
      if (blogTitle.value.length === 0 && text.value.length === 0) {
        error.value = true;
        errorMsg.value = "Please ensure you uploaded a cover photo";
        setTimeout(() => {
          error.value = false;
        }, 5000);
        return;
      }

      if (!coverPhoto.value) {
        error.value = true;
        errorMsg.value = "Please ensure you uploaded a cover photo";
        setTimeout(() => {
          error.value = false;
        }, 5000);
        return;
      }

      loading.value = true;
      console.log("[All validations passed]");
      const timestamp = Date.now();
      const fileName = coverPhoto.value.name;
      const uniqueFileName = fileName + timestamp;

      // upload the photo to the storage
      const url = await postService.uploadBlogPostPhoto(
        uniqueFileName,
        coverPhoto.value
      );

      // upload the blog post document to the firestore
      const generatedPost = await postService.uploadBlogPost({
        blogId: "",
        blogHTML: text.value,
        blogCoverPhoto: url,
        blogCoverPhotoName: fileName,
        blogTitle: blogTitle.value,
        profileId: profileId.value,
        blogDate: timestamp,
      });

      loading.value = true;
      console.log("[Route to the new post]");
      loading.value = false;

      await router.push({
        name: "view-blog",
        params: { blogId: generatedPost.blogId },
      });
    }

    // bring the data back to the text editor from firebase
    onMounted(async () => {
      const post = await postService.getPostById(route.params.blogId);
      if (post) {
        currentBlog.value = post;
        text.value = currentBlog.value.blogHTML;
        blogTitle.value = currentBlog.value.blogTitle;
      }
    });

    return {
      users: computed(() => userStore.profileId),
      blogHTML: computed(() => postStore.blogHTML),
      blogCoverPhotoName: computed(() => postStore.blogCoverPhotoName),
      blogPhotoFileURL: computed(() => postStore.blogPhotoFileURL),
      blogPhotoPreview: computed(() => postStore.blogPhotoPreview),
      blogPosts: computed(() => postStore.blogPosts),
      isUserLogin: computed(() => userStore.isUserLogin),
      isAdmin: computed(() => userStore.isAdmin),
      error,
      errorMsg,
      blogPhoto,
      coverPhoto,
      blogTitle,
      text,
      loading,
      currentBlog,
      fileChange,
      imageHandler,
      togglePreview: () => postStore.togglePreview(),
      uploadBlog,
      updateBlogTitle: (title: string) => postStore.updateBlogTitle(title),
    };
  },
});
</script>

<style lang="scss" src="./edit-blog.scss"></style>
