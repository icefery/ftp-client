<template>
  <el-row :gutter="12">
    <el-col :span="12">
      <el-tabs type="border-card">
        <el-tab-pane label="本地会话">
          <SessionTab />
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="12">
      <el-tabs type="border-card" @tab-click="onTabClick">
        <template v-for="[title, tab] of store.state.tabModule.tabs">
          <el-tab-pane :label="tab.title">
            <SessionTab :tab="tab" />
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import { useStore } from 'vuex'
import SessionTab from '../component/session-tab/index.vue'
import { ACTION__CURRENT } from '../store/tab.store'

const store = useStore()

const onTabClick = async context => {
  await store.dispatch(`tabModule/${ACTION__CURRENT}`, { title: context.props.label })
}
</script>
