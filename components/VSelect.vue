<template>
  <el-select
    class="Select"
    @update:model-value="(value) => $emit('update:v-model', value)"
    :multiple="multiple"
    collapse-tags
    :placeholder="placeholder"
    style="width: 240px"
    :filterable="filterable"
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

<script setup>
const emit = defineEmits(["update:v-model", "change"]);

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
  },
  multiple: {
    type: Boolean,
    default: false,
  }
});

const onChange = debounce((value) => {
  // not work
  emit('change', value)
}, 500)

function debounce(fn, wait) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer) // clear any pre-existing timer
    }
    const context = this // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args) // call the function if time expires
    }, wait)
  }
}
</script>

<style lang="scss" scoped>
.Select {
  min-width: 160px;
}
</style>
