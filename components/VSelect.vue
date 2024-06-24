<template>
  <el-select
    v-loading="isLoading"
    class="select"
    :multiple="multiple"
    collapse-tags
    :placeholder="placeholder"
    :filterable="filterable"
    @update:model-value="(value) => $emit('update:v-model', value)"
    @change="onChange"
  >
    <el-option
      v-for="{ value, label, disabled } in options"
      :key="value"
      :label="label"
      :value="value"
      :disabled="disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";

interface Props {
  options: any[];
  placeholder: string;
  filterable: boolean;
  multiple: boolean;
  isLoading: boolean;
}

withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: "",
  filterable: false,
  multiple: false,
  isLoading: false,
});

const emit = defineEmits(["update:v-model", "change"]);

const onChange = useDebounceFn((value: string[] | string) => {
  if (!value.length) return;

  emit("change", value);
}, 750);
</script>

<style lang="scss" scoped>
.select {
  width: 240px;
  min-width: 160px;

  :deep(.el-loading-mask) {
    background: var(--bg-app);
    bottom: unset;
    left: unset;
    width: 24px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
  }

  &:deep(.el-loading-spinner) {
    width: 100%;
    height: 100%;
    top: unset;
    margin: unset;
  }

  &:deep(.circular) {
    width: 100%;
    height: 100%;
  }
}
</style>
