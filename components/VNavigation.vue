<template>
  <el-menu
    class="navigation gap-2"
    :collapse="false"
    @open="handleOpen"
    @close="handleClose"
    router
    :default-active="loadedUrl"
    mode="horizontal"
  >
    <el-menu-item
      v-for="({ disabled, icon, path, label }, i) in navigation"
      :key="i"
      :index="path"
      :disabled="disabled"
    >
      <span>{{ label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
defineProps({
  navigation: {
    type: Array,
    default: () => [],
  }
});
</script>

<style lang="scss" scoped>
.navigation {
  :deep(.el-menu-item) {
    padding: 0;
  }
}
</style>
