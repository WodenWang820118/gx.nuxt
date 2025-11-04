import { firestore } from "../shared/firebase/firebase-firestore";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  startAfter,
} from "firebase/firestore";
import { BLOG_POSTS_COLLECTION } from "../shared/firebase/firebase-config";

interface Post {
  blogId: string;
  blogHTML: string;
  blogCoverPhoto: string;
  blogTitle: string;
  blogDate: string;
  blogCoverPhotoName: string;
  welcomeScreen?: boolean;
}

export const usePostStore = defineStore(
  "posts",
  () => {
    // states
    const blogHTML = ref("Write your blog title here...");
    const blogTitle = ref("");
    const blogCoverPhotoName = ref("");
    const blogPhotoFileURL = ref("");
    const blogPhotoPreview = ref(false);
    const welcomeScreen = ref(false);
    const blogPosts: Ref<Post[]> = ref([]);
    const postLoaded = ref(false);
    const editPost = ref(false);
    const lastVisibleSnapshot: Ref<
      QueryDocumentSnapshot<DocumentData, DocumentData>
    > = ref(null as any);

    function blogPostsFeed() {
      return blogPosts.value.slice(0, 2);
    }

    function blogPostsCards() {
      return blogPosts.value.slice(2, 6);
    }

    // actions
    async function getPost() {
      // if there are already posts, don't fetch again
      // persistent with sessionStorage by using pinia-plugin-persistedstate
      if (blogPosts.value.length > 0) return;
      const first = query(
        collection(firestore, BLOG_POSTS_COLLECTION),
        orderBy("blogDate", "desc"),
        limit(5)
      );
      const documentSnapshots = await getDocs(first);

      if (documentSnapshots) {
        lastVisibleSnapshot.value =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setPost(documentSnapshots);
        return;
      }
    }

    async function deletePostFromDatabase(blogId: string) {
      const document = doc(firestore, BLOG_POSTS_COLLECTION, blogId);
      await deleteDoc(document);
      deletePost(blogId);
    }

    async function loadMorePosts() {
      console.log("lastVisibleSnapshot", lastVisibleSnapshot.value);
      const next = query(
        collection(firestore, BLOG_POSTS_COLLECTION),
        orderBy("blogDate", "desc"),
        startAfter(lastVisibleSnapshot.value),
        limit(5)
      );

      const documentSnapshots = await getDocs(next);

      if (documentSnapshots) {
        lastVisibleSnapshot.value =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setPost(documentSnapshots);
        return;
      }
    }

    // mutations
    function setPost(docs: QuerySnapshot<unknown, DocumentData>) {
      docs.forEach((doc) => {
        const fields = doc.data() as any;
        if (fields === undefined || fields === null) {
          return;
        }
        const data = {
          blogId: fields.blogId,
          blogHTML: fields.blogHTML,
          blogCoverPhoto: fields.blogCoverPhoto,
          blogTitle: fields.blogTitle,
          blogDate: fields.blogDate,
          blogCoverPhotoName: fields.blogCoverPhotoName,
        };
        blogPosts.value.push(data);
      });
      postLoaded.value = true;
    }

    function deletePost(payload: string) {
      blogPosts.value = blogPosts.value.filter(
        (post: Post) => post.blogId !== payload
      );
    }

    function getCertainPost(blogId: string | string[]) {
      return blogPosts.value.find((post: Post) => post.blogId == blogId);
    }

    function toggleEditPost(payload: boolean) {
      editPost.value = payload;
    }

    function updBlogTitle(title: string) {
      blogTitle.value = title;
    }

    function newBlogPost(post: string) {
      blogHTML.value = post;
    }

    function filenameChange(filename: string) {
      blogCoverPhotoName.value = filename;
    }

    function createFileURL(fileURL: string) {
      blogPhotoFileURL.value = fileURL;
    }

    function togglePreview() {
      blogPhotoPreview.value = !blogPhotoPreview.value;
    }

    function updateBlogTitle(title: string) {
      blogTitle.value = title;
    }

    return {
      blogHTML,
      blogTitle,
      blogCoverPhotoName,
      blogPhotoFileURL,
      blogPhotoPreview,
      blogPosts,
      postLoaded,
      welcomeScreen,
      editPost,
      blogPostsFeed,
      blogPostsCards,
      toggleEditPost,
      updBlogTitle,
      newBlogPost,
      filenameChange,
      createFileURL,
      togglePreview,
      getPost,
      deletePostFromDatabase,
      getCertainPost,
      updateBlogTitle,
      loadMorePosts,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
