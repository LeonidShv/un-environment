<template>
  <div class="blog__list">
    <NuxtLink :to="`/blog/${id}`" class="bload__list-card card">
      <p class="card__author">{{ author }}</p>
      <section class="card__info-wrapper d-flex gap-2">
        <div>
          <h3 class="card__title">
            {{ title }}
          </h3>
          <p class="card__description">
            {{ description[0] }}
          </p>
        </div>
        <img
          class="card__img"
          :src="`/un-environment${imgSrc}`"
          :alt="imgAlt"
        />
      </section>
      <div class="card__footer d-flex gap-1">
        <p class="card__footer-text">{{ timeRead }}</p>
        <p class="card__footer-text">{{ date }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type { IBlog } from "@/pages/Blog/interfaces/blog";

withDefaults(defineProps<IBlog>(), {
  id: "",
  author: "",
  title: "",
  description: [],
  imgSrc: "",
  imgAlt: "",
  timeRead: "",
  date: "",
});
</script>

<style lang="scss">
.card {
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  border-bottom: 1px solid var(--el-menu-border-color);
  transition: 0.4s background-color;

  &:hover {
    background: #f9f9f9;
  }

  &__author {
    font-style: italic;
    font-size: 0.9rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__info-wrapper {
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1rem;
    color: #6b6b6b;
  }

  &__img {
    width: 160px;
    height: 130px;
    object-fit: cover;
  }

  &__footer-text {
    font-size: 0.9rem;
    color: #6b6b6b;
  }
}
</style>
