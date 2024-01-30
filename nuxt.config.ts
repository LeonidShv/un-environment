// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@element-plus/nuxt", "@pinia/nuxt"],
  // eslint: {
  // },
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
