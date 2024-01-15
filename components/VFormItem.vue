<template>
  <el-form-item :prop="prop">
    <slot />
  </el-form-item>
</template>

<script setup>
defineProps({
  prop: {
    type: String,
    default: ''
  },
});
</script>
