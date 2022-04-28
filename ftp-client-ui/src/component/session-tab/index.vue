<template>
  <!-- pwd -->
  <SessionTabPwd :tab="props.tab" v-model:pwd="model.pwd" />

  <el-table
    :data="store.state.tabModule.tabs.get(props.tab.title).ls"
    style="width: 100%"
    size="small"
    :border="true"
    @row-dblclick="row => cd(row)"
    height="500"
  >
    <el-table-column label="类型" width="70" sortable align="center" prop="filetype">
      <template #default="{ row }">
        <SessionTabFiletype :filetype="row.filetype" />
      </template>
    </el-table-column>
    <el-table-column prop="filename" label="名称" width="250" sortable show-overflow-tooltip />
    <el-table-column prop="filesize" label="大小" width="70" sortable align="center">
      <template #default="{ row }">
        {{ formatSize(row.filesize) }}
      </template>
    </el-table-column>
    <el-table-column prop="filetime" label="时间" wdith="50" sortable align="center" />
    <el-table-column label="操作" align="center">
      <template #default="{ row }">
        <SessionTabOpt :tab="props.tab" :row="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ACTION__CD, ACTION__MV, ACTION__RM } from '../../store/tab.store'
import { formatSize } from '../../util/function'
import SessionTabPwd from './session-tab-pwd.vue'
import SessionTabFiletype from './session-tab-filetype.vue'
import SessionTabOpt from './session-tab-opt.vue'

const store = useStore()

const props = defineProps({
  tab: { type: Object, default: { title: '本地会话', session: { name: '本地会话', type: 'FS' }, pwd: '/Users/icefery' } }
})

const model = reactive({
  pwd: props.tab.pwd,
  mkdir: '',
  mv: ''
})

const cd = async row => {
  if (row.filetype === 'd') {
    model.pwd = row.filepath
    await store.dispatch(`tabModule/${ACTION__CD}`, { title: props.tab.title, src: model.pwd })
  }
}

const rm = async src => {
  await store.dispatch(`tabModule/${ACTION__RM}`, { title: props.tab.title, src })
}

const mv = async src => {
  await store.dispatch(`tabModule/${ACTION__MV}`, { title: props.tab.title, src, dst: model.pwd + '/' + model.mv })
}

onMounted(async () => {
  await store.dispatch(`tabModule/${ACTION__CD}`, { title: props.tab.title, src: model.pwd })
})

const a = async () => {
  console.log('双击')
}
</script>
