<template>
  <el-popover :title="props.title" trigger="click">
    <template #reference>
      <slot></slot>
    </template>
    <template #default>
      <el-row :gutter="4">
        <el-col :span="20">
          <el-input v-model="computedValue" size="small" />
        </el-col>
        <el-col :span="4">
          <el-button
            :disabled="computedValue === '' || computedValue === props.initValue"
            :plain="true"
            size="small"
            style="width: 100%"
            type="primary"
            @click="() => emit('confirm', computedValue)"
          >
            <el-icon>
              <Check />
            </el-icon>
          </el-button>
        </el-col>
      </el-row>
    </template>
  </el-popover>
</template>

<script setup>
import { Check } from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  value: { type: String, default: '' },
  initValue: { type: String, default: '' }
})

const emit = defineEmits(['update:value', 'update:visible', 'confirm'])

const computedValue = computed({
  get: () => props.value,
  set: value => emit('update:value', value)
})
</script>
