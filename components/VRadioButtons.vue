<template>
  <el-radio-group
    class="select"
    @update:model-value="(value) => $emit('update:v-model', value)"
  >
    <el-radio v-for="{ value, label } in options" :key="value" :label="label">
      {{ value }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
interface Props {
  options: any[]
}

withDefaults(defineProps<Props>(), {
  options: () => []
})

const emit = defineEmits(['update:v-model'])
</script>

<style lang="scss" scoped>
.select {
  flex-direction: column;
  align-items: unset;
  justify-content: center;
}
</style>
