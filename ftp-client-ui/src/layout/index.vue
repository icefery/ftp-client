<template>
  <el-container>
    <el-aside style="width: 200px; margin-left: 20px">
      <AsideLayout />
    </el-aside>
    <el-container style="margin-top: -20px">
      <el-main>
        <MainLayout />
      </el-main>
      <el-footer>
        <FooterLayout />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import AsideLayout from './aside.layout.vue'
import FooterLayout from './footer.layout.vue'
import MainLayout from './main.layout.vue'
</script>
