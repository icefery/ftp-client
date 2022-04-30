<template>
  <el-row :gutter="12">
    <el-col :span="12">
      <el-tabs type="border-card">
        <el-tab-pane :label="store.state.tabModule.local.title">
          <SessionTab
            :index="-1"
            :position="store.state.tabModule.local.position"
            :session="store.state.tabModule.local.session"
            :title="store.state.tabModule.local.title"
          />
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="12">
      <el-tabs
        v-model="state.name"
        :closable="true"
        type="border-card"
        @tab-remove="name => disconnect(Number.parseInt(name))"
      >
        <template v-for="(tab, index) in store.state.tabModule.tabs" :key="tab.index">
          <el-tab-pane :label="tab.title" :name="`${index}`">
            <SessionTab :index="index" :position="tab.position" :session="tab.session" :title="tab.title" />
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import SessionTab from '../component/session-tab.vue'
import { ACTION__CHANGE_CURRENT, ACTION__DISCONNECT } from '../store/tab.store'

const store = useStore()

const state = reactive({
  name: '0'
})

const changeCurrent = async index => {
  await store.dispatch(`tabModule/${ACTION__CHANGE_CURRENT}`, { index })
}

const disconnect = async index => {
  await store.dispatch(`tabModule/${ACTION__DISCONNECT}`, { index })
  const currentIndex = Number.parseInt(state.name)
  if (index <= currentIndex) {
    state.name = `${currentIndex - 1}`
  }
}

watch(state, async (newValue, oldValue) => {
  await changeCurrent(Number.parseInt(newValue.name))
})
</script>
