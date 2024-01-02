<template>
  <el-select
    class="Select"
    @update:model-value="(value) => $emit('update:v-model', value)"
    :multiple="false"
    collapse-tags
    :placeholder="placeholder"
    style="width: 240px"
    :filterable="filterable"
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

<script setup>
defineEmits(["update:v-model"]);

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
  filterable: {
    type: Boolean,
    default: false,
  }
});
</script>

<style lang="scss" scoped>
.Select {
  min-width: 160px;
}
</style>
