<template>
  <el-date-picker
    @update:model-value="(date) => $emit('update:v-model', date)"
    @change="onChange"
    :type="type"
    :placeholder="placeholder"
    size="default"
  />
</template>

<script setup lang="ts">
import { EDatePickerType, EDatePickerSize } from '@/interfaces/enums'
const emit = defineEmits(["update:v-model", "change"]);

interface Props {
  loading: boolean
  placeholder: string
  type: EDatePickerType
  size: EDatePickerSize
}

withDefaults(defineProps<Props>(), {
  loading: false,
  placeholder: '',
  type: EDatePickerType.date,
  size: EDatePickerSize.default,
})

function onChange(date: Date) {
  emit('change', date)
}
</script>
