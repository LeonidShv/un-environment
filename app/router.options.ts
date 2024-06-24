import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: "home",
      path: "/",
      component: () =>
        import("@/pages/Dashboard/DashboardPage.vue").then(
          (r) => r.default || r,
        ),
    },
    {
      name: "map",
      path: "/map-pollution",
      component: () =>
        import("@/pages/Map/MapPage.vue").then((r) => r.default || r),
    },
    {
      name: "blog",
      path: "/blog",
      component: () => import("@/pages/Blog/BlogPage.vue"),
    },
    {
      name: "article",
      path: "/blog/:id",
      component: () =>
        import("@/pages/Article/ArticlePage.vue").then((r) => r.default || r),
    },
  ],
};
