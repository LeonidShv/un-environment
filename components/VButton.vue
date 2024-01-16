<template>
  <ElButton class="Button" v-if="type === 'default'">
    <slot />
  </ElButton>
  <router-link
    v-else-if="type === 'back'"
    :to="to"
    class="button__link"
  >
    <ArrowLeft class="button__icon" />Back
    <span>|</span>
  </router-link>
</template>

<script setup lang="ts">
export interface Props {
  loading?: boolean
  type: "default" | "back"
  to: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  type: 'default',
  to: ''
})
</script>

<style lang="scss" scoped>
.button {
  &__icon {
    width: 16px;
    height: auto;
    margin-right: 8px;
  }

  &__link {
    display: flex;
    align-items: center;
    line-height: 24px;

    span {
      margin-left: 8px;
      font-size: 24px;
    }
  }
}
</style>
