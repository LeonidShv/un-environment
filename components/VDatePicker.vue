<template>
  <el-date-picker
    @change="onChange"
    :type="type"
    :placeholder="placeholder"
    size="default"
  />
</template>

<script setup>
const emit = defineEmits(["update:v-model", "change"]);

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'date',
    validator(value) {
      return ['year', 'date', 'dates', 'daterange'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(value) {
      return ['default', 'large', 'small'].includes(value)
    }
  }
})

function onChange(date) {
  emit('update:v-model', date)
  emit('change', date)
}
</script>
