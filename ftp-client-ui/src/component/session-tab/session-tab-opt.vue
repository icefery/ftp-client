<template>
  <!-- mv -->
  <PopInput v-model:value="model.mv" :init-value="row.filename" @confirm="() => mv(row.filepath)">
    <el-button size="small" type="primary" :plain="true">
      <el-icon>
        <edit />
      </el-icon>
    </el-button>
  </PopInput>
  <!-- rm -->
  <el-popconfirm title="确认要删除吗？" @confirm="() => rm(row.filepath)">
    <template #reference>
      <el-button size="small" type="danger" :plain="true">
        <el-icon>
          <delete />
        </el-icon>
      </el-button>
    </template>
  </el-popconfirm>
  <!-- get | put -->
  <el-button size="small" type="warning" :plain="true">
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

<script setup>
import PopInput from '../pop-input.vue'
import { Delete, Download, Edit, Upload } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { ACTION__MV, ACTION__RM } from '../../store/tab.store'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  tab: { type: Object },
  row: { type: Object }
})

const model = reactive({
  mv: ''
})

const rm = async src => {
  await store.dispatch(`tabModule/${ACTION__RM}`, { title: props.tab.title, src })
}

const mv = async src => {
  await store.dispatch(`tabModule/${ACTION__MV}`, { title: props.tab.title, src, dst: model.pwd + '/' + model.mv })
}
</script>
