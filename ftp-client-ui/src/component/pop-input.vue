<template>
  <el-popover trigger="click">
    <template #reference>
      <slot></slot>
    </template>
    <template #default>
      <el-row :gutter="4">
        <el-col :span="20">
          <el-input size="small" v-model="newValue" />
        </el-col>
        <el-col :span="4">
          <el-button
            size="small"
            type="primary"
            style="width: 100%"
            :plain="true"
            @click=";(emit('confirm', newValue) || true) && ((model.initValue = props.value) || true)"
            :disabled="newValue === model.initValue"
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
import { computed, reactive } from 'vue'

const props = defineProps({
  value: { type: String, default: '' }
})

const emit = defineEmits(['update:value', 'update:visible', 'confirm'])

const model = reactive({
  initValue: props.value
})

const newValue = computed({
  get: () => props.value,
  set: newValue => emit('update:value', newValue)
})
</script>
