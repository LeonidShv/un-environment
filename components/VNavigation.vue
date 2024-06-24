<template>
  <el-menu class="navigation gap-2" :collapse="false" router mode="horizontal">
    <el-menu-item
      v-for="({ disabled, path, label }, i) in navigation"
      :key="i"
      :index="path"
      :disabled="disabled"
    >
      <span>{{ label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import type { INavigationItem } from "@/interfaces/navigation";

interface Props {
  navigation: INavigationItem[];
}

withDefaults(defineProps<Props>(), {
  navigation: () => [],
});
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;

  :deep(.el-menu-item) {
    padding: 0;
  }
}
</style>
