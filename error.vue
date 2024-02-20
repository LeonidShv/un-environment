<template>
  <section class="error">
    <div class="m-auto">
      <template v-if="error.statusCode === 404">
        <Vue3Lottie :animation-data="notFoundPage" :height="200" :width="200" />
        <h1>404!</h1>
        <p class="Error-text">
          Not found page, please go back to the home page.
        </p>
      </template>
      <template v-else>
        <p>{{ error.message }}</p>
      </template>

      <a class="error-link" @click="handleError">
        <VButton> Go home </VButton>
      </a>
    </div>
  </section>
</template>

<script setup>
import { Vue3Lottie } from "vue3-lottie";

import notFoundPage from "@/assets/animations/notFoundPage.json";

const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 90vh;

  &-text {
    font-size: 24px;
  }

  &-link {
    display: block;
    margin-top: 32px;
  }
}
</style>
