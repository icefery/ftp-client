<template>
  <el-table
    :border="true"
    :data="computedLs"
    height="600"
    size="small"
    style="width: 100%"
    @row-dblclick="row => row.type === 'd' && emit('dir-double-click', row)"
  >
    <el-table-column align="center" label="类型" prop="type" sortable width="75">
      <template #default="scope">
        <FileType :type="scope.row.type" />
      </template>
    </el-table-column>

    <el-table-column label="名称" prop="name" show-overflow-tooltip sortable />

    <el-table-column align="center" label="大小" prop="size" sortable width="75">
      <template #default="scope">
        {{ formatSize(scope.row.size) }}
      </template>
    </el-table-column>

    <el-table-column align="center" label="时间" prop="time" sortable width="150" />

    <el-table-column align="center" label="操作" width="150">
      <template #header>
        <el-checkbox-group v-model="state.filters" size="small">
          <el-checkbox-button label="show-hide" size="small">
            <el-icon>
              <hide />
            </el-icon>
          </el-checkbox-button>
          <el-checkbox-button label="show-dir" size="small">
            <el-icon>
              <folder />
            </el-icon>
          </el-checkbox-button>
          <el-checkbox-button label="show-file" size="small">
            <el-icon>
              <document />
            </el-icon>
          </el-checkbox-button>
        </el-checkbox-group>
      </template>
      <template #default="scope">
        <PopInput
          v-model:value="state.mv"
          :init-value="scope.row.name"
          @confirm="() => emit('mv-click', scope.row.path, state.mv) || (state.mv = '')"
        >
          <el-button
            :plain="true"
            size="small"
            style="width: 30px"
            type="primary"
            @click="() => (state.mv = scope.row.name)"
          >
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
            <el-button :plain="true" size="small" style="width: 30px" type="danger">
              <el-icon>
                <delete />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
        <template v-if="props.index === -1">
          <el-button
            :disabled="!store.state.tabModule.current"
            :plain="true"
            size="small"
            style="width: 30px"
            type="warning"
            @click="() => emit('upload-click', scope.row.name, scope.row.path)"
          >
            <el-icon>
              <upload />
            </el-icon>
          </el-button>
        </template>
        <template v-else>
          <el-button
            :disabled="!store.state.tabModule.current"
            :plain="true"
            size="small"
            style="width: 30px"
            type="warning"
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
import { Delete, Document, Download, Edit, Folder, Hide, Upload } from '@element-plus/icons-vue'
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { formatSize } from '../util/function'
import FileType from './file-type.vue'
import PopInput from './pop-input.vue'

const store = useStore()

const props = defineProps({
  index: { type: Number }
})

const emit = defineEmits(['dir-double-click', 'mv-click', 'rm-click', 'upload-click', 'download-click'])

const state = reactive({
  mv: '',
  filters: ['show-hide', 'show-dir', 'show-file']
})

const computedLs = computed(() => {
  let ls = props.index === -1 ? store.state.tabModule.local?.ls : store.state.tabModule.tabs[props.index]?.ls
  if (!state.filters.includes('show-hide')) {
    ls = ls.filter(f => !f.name.startsWith('.'))
  }
  if (!state.filters.includes('show-dir')) {
    ls = ls.filter(f => f.type !== 'd')
  }
  if (!state.filters.includes('show-file')) {
    ls = ls.filter(f => f.type !== '-')
  }

  return ls
})
</script>
