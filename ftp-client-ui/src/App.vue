<template>
  <el-config-provider :locale="zhCn">
    <Layout />
  </el-config-provider>
</template>

<script setup>
import Layout from './layout/index.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
