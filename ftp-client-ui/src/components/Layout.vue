<template>
  <el-container>
    <el-aside width="200px">
      <LayoutAside />
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <LayoutMain />
      </el-main>
      <el-footer>
        <LayoutFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutMain from './LayoutMain.vue'
import LayoutFooter from './LayoutFooter.vue'
import LayoutAside from './LayoutAside.vue'
</script>
