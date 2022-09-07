import { createRouter, createWebHistory } from "vue-router";
import PostsListPage from "@/pages/posts-list.vue";
import CurrentPostPage from "@/pages/current-post.vue"
import AddPostPage from "@/pages/add-post.vue"

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: "/posts"
    },
    {
      path: "/posts",
      component: PostsListPage,
    },
    {
      path: '/post/:id', 
      component: CurrentPostPage
    },
    {
      path: '/add', 
      component: AddPostPage
    }
  ]
});
export default router;