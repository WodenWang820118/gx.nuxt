import { createWebHistory, createRouter } from "vue-router";

// identify the routes here, the route could have children routes
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: () => import("./views/home/home.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/blogs",
    name: "blogs",
    props: true,
    component: () => import("./views/blogs/blogs.vue"),
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/login",
    name: "login",
    props: true,
    component: () => import("./views/login/login.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    props: true,
    component: () => import("./views/register/register.vue"),
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    props: true,
    component: () => import("./views/forgot-password/forgot-password.vue"),
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/profile",
    name: "profile",
    props: true,
    component: () => import("./views/profile/profile.vue"),
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/create-post",
    name: "create-post",
    props: true,
    component: () => import("./views/create-post/create-post.vue"),
    meta: {
      title: "Create Post",
    },
  },
  {
    path: "/view-blog/:blogId",
    name: "view-blog",
    props: true,
    component: () => import("./views/view-blog/view-blog.vue"),
    meta: {
      title: "View Blog",
    },
  },
  {
    path: "/edit-post/:blogId",
    name: "edit-blog",
    props: true,
    component: () => import("./views/edit-blog/edit-blog.vue"),
    meta: {
      title: "Edit Blog Post",
    },
  },
];

// auto-generated when creating the project using router in vue 3
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = `${to.meta.title} | FireBlog`;
});

export default router;
