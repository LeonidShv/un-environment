<template>
  <el-menu
    class="el-menu-vertical-demo"
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
import { ref } from "vue";

defineProps({
  navigation: {
    type: Array,
    default: () => [],
  }
});
</script>

<style lang="scss" scoped>
.Navigation {
  align-items: center;
  flex-grow: 1;

  &-item {
    &--indent {
      margin-left: auto;
    }
  }

  &-modeSwitch {
    height: 100%;
  }

  &.el-menu--horizontal.el-menu {
    border: 0;
  }

  &.el-menu {
    --el-menu-bg-color: var(--bg-block);
  }

  :deep(.el-sub-menu) {
    margin-left: auto;
  }
}

.Navigation .el-menu--horizontal.el-menu--popup-container,
.el-menu.el-menu--popup.el-menu--popup-bottom-start {
  .Navigation-modeSwitch {
    height: unset;
    margin-left: 9px;
  }
}
</style>
