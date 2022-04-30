<template>
  <el-button size="small" style="width: 100%" @click="() => (state.dialog.visible = true)">
    <el-icon>
      <plus />
    </el-icon>
  </el-button>
  <el-tree
    :data="store.state.sessionModule.trees"
    :default-expand-all="true"
    :props="{ label: 'name' }"
    @node-click="onNodeClick"
  />
  <el-dialog v-model="state.dialog.visible">
    <SessionDialog />
  </el-dialog>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

import SessionDialog from '../component/session-dialog.vue'

import { ACTION__F5 } from '../store/session.store'
import { ACTION__CONNECT } from '../store/tab.store'

const store = useStore()

const state = reactive({
  dialog: {
    visible: false
  }
})

const onNodeClick = async node => {
  if (node.data) {
    await store.dispatch(`tabModule/${ACTION__CONNECT}`, { session: node.data })
  }
}

onMounted(async () => {
  await store.dispatch(`sessionModule/${ACTION__F5}`)
})
</script>
