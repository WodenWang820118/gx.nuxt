<template>
  <navigation :isUserLogin="isUserLogin" :isAdmin="isAdmin" />
  <div class="create-post">
    <blog-cover-preview v-show="blogPhotoPreview" />
    <loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !isError }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="observeFile"
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
        <md-editor
          :language="'en-US'"
          v-model="text"
          @upload-image="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// components
import BlogCoverPreview from "../../shared/components/blog-cover-preview/blog-cover-preview.vue";
import Loading from "../../shared/components/loading/loading.vue";
import Navigation from "../../shared/components/navigation/navigation.vue";
import Footer from "../../shared/components/footer/footer.vue";
// vue
import { ref, defineComponent, Ref, computed, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "../../stores/posts";
import { useUserStore } from "../../stores/users";
// services
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
  name: "create-post",
  components: {
    "blog-cover-preview": BlogCoverPreview,
    loading: Loading,
    "md-editor": AsyncMdEditor,
    navigation: Navigation,
    "footer-vue": Footer,
  },
  setup() {
    const postStore = usePostStore();
    const userStore = useUserStore();
    const isError = ref(false);
    const errorMsg = ref("");
    const coverPhoto: Ref<File | undefined> = ref(undefined);
    const blogTitle = ref("");
    const text = ref("");
    const loading = ref(false);
    const blogPhoto = ref("" as any);
    const profileId = computed(() => userStore.profileId);
    const postService = new PostService();
    const router = useRouter();

    async function observeFile() {
      coverPhoto.value = await postService.imageCompressionHandler(
        blogPhoto.value.files[0]
      );
      console.log(coverPhoto.value);
      if (!coverPhoto.value) {
        return;
      }

      postStore.filenameChange(coverPhoto.value.name);
      postStore.createFileURL(URL.createObjectURL(coverPhoto.value));
    }

    async function imageHandler(files: File[]) {
      return await postService.imageHandler(files);
    }

    // TODO: try catch with error loading
    async function uploadBlog() {
      if (blogTitle.value.length === 0 && text.value.length === 0) {
        isError.value = true;
        errorMsg.value = "Please ensure you uploaded a cover photo";
        setTimeout(() => {
          isError.value = false;
        }, 5000);
        return;
      }

      if (!coverPhoto.value) {
        isError.value = true;
        errorMsg.value = "Please ensure you uploaded a cover photo";
        setTimeout(() => {
          isError.value = false;
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

    return {
      blogHTML: computed(() => postStore.blogHTML),
      blogCoverPhotoName: computed(() => postStore.blogCoverPhotoName),
      blogPhotoFileURL: computed(() => postStore.blogPhotoFileURL),
      blogPhotoPreview: computed(() => postStore.blogPhotoPreview),
      isUserLogin: computed(() => userStore.isUserLogin),
      isAdmin: computed(() => userStore.isAdmin),
      updateBlogTitle: (title: string) => postStore.updBlogTitle(title),
      togglePreview: () => postStore.togglePreview(),
      observeFile,
      imageHandler,
      uploadBlog,
      profileId,
      isError,
      errorMsg,
      coverPhoto,
      blogTitle,
      text,
      loading,
      blogPhoto,
    };
  },
});
</script>

<style lang="scss" src="./create-post.scss"></style>
