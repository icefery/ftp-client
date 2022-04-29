<template>
  <el-row :gutter="12">
    <el-col :span="12">
      <el-tabs type="border-card">
        <el-tab-pane :label="store.state.tabModule.local.title">
          <SessionTab
            :index="store.state.tabModule.local.index"
            :position="store.state.tabModule.local.position"
            :title="store.state.tabModule.local.title"
            :session="store.state.tabModule.local.session"
          />
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="12">
      <el-tabs
        v-model="model.index"
        type="border-card"
        @tab-change="event => changeCurrent(event)"
        :closable="true"
        @tab-remove="event => disconnect(event)"
      >
        <template v-for="tab in store.state.tabModule.tabs" :key="tab.index">
          <el-tab-pane :label="tab.title" :name="tab.index">
            <SessionTab :index="tab.index" :position="tab.position" :title="tab.title" :session="tab.session" />
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import { useStore } from 'vuex'
import { ACTION__CHANGE_CURRENT, ACTION__DISCONNECT } from '../store/tab.store'
import SessionTab from '../component/session-tab.vue'
import { reactive } from 'vue'

const store = useStore()

// 切换当前会话
const changeCurrent = async index => {
  await store.dispatch(`tabModule/${ACTION__CHANGE_CURRENT}`, { index })
}

// 关闭指定会话
const disconnect = async index => {
  await store.dispatch(`tabModule/${ACTION__DISCONNECT}`, { index })
  model.index = store.state.tabModule.current.index
  console.log(store.state.tabModule, model.index)
}

const model = reactive({
  index: 0
})
</script>
