<template>
  <template v-if="props.type === 'd'">
    <el-icon color="#E6A23C">
      <folder />
    </el-icon>
  </template>
  <template v-else-if="props.type === '-'">
    <el-icon>
      <document />
    </el-icon>
  </template>
</template>

<script setup>
import { Document, Folder } from '@element-plus/icons-vue'

const props = defineProps({
  type: { type: String }
})
</script>
