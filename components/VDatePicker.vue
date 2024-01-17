<template>
  <el-date-picker
    @change="onChange"
    :type="type"
    :placeholder="placeholder"
    size="default"
  />
</template>

<script setup lang="ts">
import { DatePickerType, DatePickerSize } from '@/interfaces/enums'
const emit = defineEmits(["update:v-model", "change"]);

interface Props {
  loading: boolean
  placeholder: string
  type: DatePickerType
  size: DatePickerSize
}

withDefaults(defineProps<Props>(), {
  loading: false,
  placeholder: '',
  type: DatePickerType.date,
  size: DatePickerSize.default,
})

function onChange(date: Date) {
  emit('update:v-model', date)
  emit('change', date)
}
</script>
