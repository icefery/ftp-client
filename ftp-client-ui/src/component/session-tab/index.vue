<template>
  <!-- pwd -->
  <el-input v-model='model.pwd' @keyup.enter='cd(model.pwd)' style='margin-bottom: 15px'>
    <!-- cd .. -->
    <template #prepend>
      <el-button @click='back()'>
        <el-icon>
          <arrow-left />
        </el-icon>
      </el-button>
    </template>
    <!-- mkdir -->
    <template #append>
      <PopInput v-model:value='model.mkdir' @confirm='mkdir()'>
        <el-button>
          <el-icon>
            <folder-add />
          </el-icon>
        </el-button>
      </PopInput>
    </template>
  </el-input>

  <!-- ls -->
  <el-table
    :data='store.state.tabModule.tabs.get(props.tab.title).ls'
    style='width: 100%'
    size='small'
    :border='true'
    @row-dblclick="row => row.filetype === 'd' && cd(row.filepath)"
    height='500'
  >
    <el-table-column label='类型' width='70' sortable align='center' prop='filetype'>
      <template #default='{ row }'>
        <Filetype :filetype='row.filetype' />
      </template>
    </el-table-column>
    <el-table-column prop='filename' label='名称' width='250' sortable show-overflow-tooltip />
    <el-table-column prop='filesize' label='大小' width='70' sortable align='center'>
      <template #default='{ row }'>
        {{ formatSize(row.filesize) }}
      </template>
    </el-table-column>
    <el-table-column prop='filetime' label='时间' wdith='50' sortable align='center' />
    <el-table-column label='操作' align='center'>
      <template #default='{ row }'>
        <!-- mv -->
        <PopInput v-model:value='model.mv' @confirm='() => mv(row.filepath)'>
          <el-button size='small' type='primary' :plain='true' @click='model.mv = row.filename'>
            <el-icon>
              <edit />
            </el-icon>
          </el-button>
        </PopInput>
        <!-- rm -->
        <el-popconfirm title='确认要删除吗？' @confirm='() => rm(row.filepath)'>
          <template #reference>
            <el-button size='small' type='danger' :plain='true'>
              <el-icon>
                <delete />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
        <!-- get | put -->
        <el-button size='small' type='warning' :plain='true'>
          <template v-if="props.tab.session.type === 'FS'">
            <el-icon>
              <upload />
            </el-icon>
          </template>
          <template v-else>
            <el-icon>
              <download />
            </el-icon>
          </template>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ACTION__CD, ACTION__MKDIR, ACTION__MV, ACTION__RM } from '../../store/tab.store'
import { ArrowLeft, Delete, Download, Edit, FolderAdd, Upload } from '@element-plus/icons-vue'
import { formatSize } from '../../util/function'
import Filetype from '../filetype.vue'
import PopInput from '../pop-input.vue'

import osAPI from '../../api/os.api'

const store = useStore()

const props = defineProps({
  tab: {
    type: Object,
    default: { title: '本地会话', session: { name: '本地会话', type: 'FS' }, pwd: '/Users/icefery' }
  }
})

const model = reactive({
  pwd: props.tab.pwd,
  mkdir: '',
  mv: ''
})

const cd = async src => {
  model.pwd = src
  await store.dispatch(`tabModule/${ACTION__CD}`, { title: props.tab.title, src })
}

const back = async () => {
  const r = await osAPI.resolve([model.pwd, '..'])
  model.pwd = r.data
  console.log('当前的 pwd=', model.pwd)
  await cd(model.pwd)
}

const mkdir = async () => {
  const r = await osAPI.resolve([model.pwd, model.mkdir])
  const dst = r.data
  await store.dispatch(`tabModule/${ACTION__MKDIR}`, { title: props.tab.title, dst })
  model.mkdir = ''
}

const rm = async src => {
  await store.dispatch(`tabModule/${ACTION__RM}`, { title: props.tab.title, src })
}

const mv = async src => {
  const r = await osAPI.resolve([model.pwd, model.mv])
  const dst = r.data
  await store.dispatch(`tabModule/${ACTION__MV}`, { title: props.tab.title, src, dst })
}

onMounted(async () => {
  await store.dispatch(`tabModule/${ACTION__CD}`, { title: props.tab.title, src: model.pwd })
})
</script>