<template>
  <template v-if="props.filetype === 'd'">
    <el-icon color="#E6A23C">
      <folder />
    </el-icon>
  </template>
  <template v-else-if="props.filetype === '-'">
    <el-icon>
      <document />
    </el-icon>
  </template>
</template>

<script setup>
import { Document, Folder } from '@element-plus/icons-vue'

const props = defineProps({
  filetype: { type: String, default: '-' }
})
</script>
