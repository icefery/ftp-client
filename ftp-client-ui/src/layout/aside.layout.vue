<template>
  <el-button size="small" style="width: 100%" @click="() => (model.dialog.visible = true)">
    <el-icon>
      <plus />
    </el-icon>
  </el-button>
  <el-tree
    :data="store.state.sessionModule.trees"
    :props="{ label: 'name' }"
    :default-expand-all="true"
    @node-click="onNodeClick"
  />
  <el-dialog v-model="model.dialog.visible">
    <SessionDialog />
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { Plus } from '@element-plus/icons-vue'

import { ACTION__F5 } from '../store/session.store'
import { ACTION__CONNECT } from '../store/tab.store'

import SessionDialog from '../component/session-dialog.vue'

const store = useStore()

const model = reactive({
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
