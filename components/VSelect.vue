<template>
  <el-select
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
}

withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: "",
  filterable: false,
  multiple: false,
});

const emit = defineEmits(["update:v-model", "change"]);

const onChange = useDebounceFn((value: string[] | string) => {
  emit("change", value);
}, 750);
</script>

<style lang="scss" scoped>
.select {
  width: 240px;
  min-width: 160px;
}
</style>
