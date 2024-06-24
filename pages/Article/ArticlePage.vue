<template>
  <section class="article p-t-2 p-b-4">
    <h2 class="article__title m-b-1">{{ article?.title }}</h2>
    <p class="article__author">{{ article?.author }}</p>
    <div class="article__header d-flex gap-1">
      <p class="article__header-text">{{ article?.timeRead }}</p>
      <p class="article__header-text">{{ article?.date }}</p>
    </div>

    <div class="devider m-t-1 m-b-1"></div>

    <div class="article__info">
      <nuxt-img
        class="article__img m-b-2"
        :src="article?.imgSrc"
        :alt="article?.imgAlt"
        format="webp"
        fit="cover"
        loading="lazy"
      />
      <template v-for="(description, i) in article?.description" :key="i">
        <p
          v-if="!description.includes('</ul>')"
          class="article__description m-b-1"
          v-html="description"
        />
        <div
          v-else
          class="article__description-wrapper m-b-1"
          v-html="description"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import articles from "@/assets/articles/articles.json";

const route = useRoute();

const article = computed(() => {
  return articles.articles.find(({ id }) => id === route.params.id);
});

useHead({
  title: article.value?.title,
  meta: [
    { name: "description", content: article.value?.description[0] },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: article.value?.date },
    { property: "og:title", content: article.value?.title },
    { name: "author", content: article.value?.author },
  ],
  htmlAttrs: { lang: "en" },
});
</script>

<style lang="scss" scoped>
.article {
  max-width: 720px;

  &__title {
    font-size: 3rem;
    font-weight: bold;
  }
}

.devider {
  height: 1rem;
  width: 100%;
  border-bottom: 1px solid var(--el-menu-border-color);
}

.article {
  &__author {
    font-style: italic;
    font-size: 0.9rem;
  }

  &__info-wrapper {
    margin-bottom: 1rem;
  }

  &__description {
    color: #6b6b6b;
    text-indent: 1rem;

    &:deep() a {
      text-decoration: underline;
      text-indent: 1rem;
    }
  }

  &__description-wrapper {
    &:deep() ul {
      list-style: none;
    }

    &:deep() li {
      text-indent: 1rem;
      margin-bottom: 0.5rem;
      color: #6b6b6b;
    }
  }

  &__img {
    display: block;
    width: 100%;
    height: 360px;
    object-fit: cover;
  }

  &__header-text {
    font-size: 0.9rem;
    color: #6b6b6b;
  }
}
</style>
