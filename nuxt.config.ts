// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt", "@pinia/nuxt"],
  app: {
    baseURL: "/un-environment/", // baseURL: '/<repository>/'
    buildAssetsDir: "assets", // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/global/_mixins.scss" as *;',
        },
      },
    },
  },
});
