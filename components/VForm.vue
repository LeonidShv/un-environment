<template>
  <el-form 
    :ref="ref" 
    :model="model" 
    :rules="rules" 
    class="form"
  >
    <slot />
  </el-form>
</template>

<script setup lang="ts">
export interface Props {
  ref?: string
  model: any
  rules: any
}

withDefaults(defineProps<Props>(), {
  ref: '',
  model: {},
  rules: {}
})
</script>

<style lang="scss" scoped>
.form :deep(.el-form-item) {
  margin-bottom: 0;
}
</style>