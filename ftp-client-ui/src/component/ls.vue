<template>
  <el-table
    :data="index === -1 ? store.state.tabModule.local?.ls : store.state.tabModule.tabs[props.index]?.ls || []"
    style="width: 100%"
    size="small"
    :border="true"
    height="500"
    @row-dblclick="row => row.type === 'd' && emit('dir-double-click', row)"
  >
    <el-table-column prop="type" label="类型" width="100" sortable align="center">
      <template #default="scope">
        <FileType :type="scope.row.type" />
      </template>
    </el-table-column>

    <el-table-column prop="name" label="名称" sortable show-overflow-tooltip />

    <el-table-column prop="size" label="大小" width="100" sortable align="center">
      <template #default="scope">
        {{ formatSize(scope.row.size) }}
      </template>
    </el-table-column>

    <el-table-column prop="time" label="时间" width="150" sortable align="center" />

    <el-table-column label="操作" align="center" width="150">
      <template #default="scope">
        <PopInput
          v-model:value="model.mv"
          :init-value="scope.row.name"
          @confirm="() => emit('mv-click', scope.row.path, model.mv) || (model.mv = '')"
        >
          <el-button size="small" type="primary" :plain="true" @click="() => (model.mv = scope.row.name)">
            <el-icon>
              <edit />
            </el-icon>
          </el-button>
        </PopInput>
        <el-popconfirm
          :title="`删除${scope.row.type === 'd' ? '目录' : '文件'}`"
          @confirm="() => emit('rm-click', scope.row.path)"
        >
          <template #reference>
            <el-button size="small" type="danger" :plain="true">
              <el-icon>
                <delete />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
        <template v-if="props.index === -1">
          <el-button
            size="small"
            type="warning"
            :plain="true"
            :disabled="!store.state.tabModule.current"
            @click="() => emit('upload-click', scope.row.name, scope.row.path)"
          >
            <el-icon>
              <upload />
            </el-icon>
          </el-button>
        </template>
        <template v-else>
          <el-button
            size="small"
            type="warning"
            :plain="true"
            :disabled="!store.state.tabModule.current"
            @click="() => emit('download-click', scope.row.name, scope.row.path)"
          >
            <el-icon>
              <download />
            </el-icon>
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useStore } from 'vuex'
import FileType from './file-type.vue'

import { formatSize } from '../util/function'
import PopInput from './pop-input.vue'
import { reactive } from 'vue'

import { Delete, Download, Edit, Upload } from '@element-plus/icons-vue'

const store = useStore()

const props = defineProps({
  index: { type: Number }
})

const emit = defineEmits(['dir-double-click', 'mv-click', 'rm-click', 'upload-click', 'download-click'])

const model = reactive({
  mv: ''
})
</script>
