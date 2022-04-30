<template>
  <el-config-provider :locale="zhCn">
    <Layout />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Layout from './layout/index.vue'
</script>
