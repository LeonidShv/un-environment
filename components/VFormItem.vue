<template>
  <el-form-item :prop="prop">
    <slot />
  </el-form-item>
</template>

<script setup lang="ts">
interface Props {
  prop: string
}

withDefaults(defineProps<Props>(), {
  prop: ''
});
</script>
