<template>
  <el-date-picker
    @change="(value) => $emit('update:v-model', value)"
    v-model="value1"
    :type="type"
    :placeholder="placeholder"
    size="default"
    value-format="YYYY-MM-DD"
  />
</template>

<script setup>
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
</script>
