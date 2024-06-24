<template>
  <section class="blog p-t-2 p-b-4">
    <h2 class="m-t-2 m-b-1">Climate actions</h2>

    <div class="blog__list">
      <TheCard
        v-for="{
          id,
          author,
          title,
          description,
          imgSrc,
          imgAlt,
          timeRead,
          date,
        } in articles.articles"
        :id="id"
        :author="author"
        :title="title"
        :description="description"
        :imgSrc="imgSrc"
        :imgAlt="imgAlt"
        :timeRead="timeRead"
        :date="date"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import TheCard from "@/pages/Blog/components/TheCard";
import articles from "@/assets/articles/articles.json";
</script>

<style lang="scss" scoped>
.blog {
  max-width: 720px;
}
</style>
