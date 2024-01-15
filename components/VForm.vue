<template>
  <el-form 
    :ref="ref" 
    :model="model" 
    :rules="rules" 
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
