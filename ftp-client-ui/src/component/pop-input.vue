<template>
  <el-popover v-model="model.visible">
    <template #reference>
      <slot></slot>
    </template>
    <template #default>
      <el-row :gutter="4">
        <el-col :span="20">
          <el-input size="small" v-model="model.value" @input="event => emit('update:value', event)" />
        </el-col>
        <el-col :span="4">
          <el-button
            size="small"
            type="primary"
            style="width: 100%"
            :plain="true"
            @click="event => handleClick()"
            :disabled="model.value === model.initValue"
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
import { reactive } from 'vue'

const props = defineProps({
  initValue: { type: String, default: '' },
  value: { type: String, default: '' }
})

const emit = defineEmits(['update:visible', 'update:value', 'confirm'])

const model = reactive({
  visible: false,
  initValue: props.initValue !== '' ? props.initValue : props.value,
  value: props.initValue !== '' ? props.initValue : props.value
})

const handleClick = async () => {
  console.log(model)
}
</script>
