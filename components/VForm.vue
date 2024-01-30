<template>
  <el-form :ref="refForm" :model="model" :rules="rules" class="form">
    <slot />
  </el-form>
</template>

<script setup lang="ts">
export interface Props {
  refForm?: string;
  model: any;
  rules: any;
}

withDefaults(defineProps<Props>(), {
  refForm: "",
  model: {},
  rules: {},
});
</script>

<style lang="scss" scoped>
.form :deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
