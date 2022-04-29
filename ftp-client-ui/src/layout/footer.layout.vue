<template>
  <el-table :data="store.state.taskModule.tasks" :border="true" size="small">
    <el-table-column prop="type" label="任务类型" width="100" align="center">
      <template #default="scope">
        <el-button :circle="true" size="small">
          <template v-if="scope.row.type === 'upload'">
            <el-icon>
              <upload />
            </el-icon>
          </template>
          <template v-else-if="scope.row.type === 'download'">
            <el-icon>
              <download />
            </el-icon>
          </template>
        </el-button>
      </template>
    </el-table-column>

    <el-table-column label="起始路径" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ scope.row.src.session.name }}
        <el-tag size="small">{{ scope.row.src.session.type }}</el-tag>
        {{ scope.row.src.path }}
      </template>
    </el-table-column>

    <el-table-column label="目标路径" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ scope.row.dst.session.name }}
        <el-tag size="small">{{ scope.row.dst.session.type }}</el-tag>
        {{ scope.row.dst.path }}
      </template>
    </el-table-column>

    <el-table-column label="任务进度" align="center">
      <template #default="scope">
        <el-progress
          :status="scope.row.progress.current === scope.row.progress.total ? 'success' : ''"
          :percentage="
            scope.row.progress.total === 0
              ? 0
              : Math.round((scope.row.progress.current / scope.row.progress.total) * 100)
          "
        >
          {{ formatSize(scope.row.progress.current, 2) }} / {{ formatSize(scope.row.progress.total, 2) }}
        </el-progress>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { useStore } from 'vuex'
import { formatSize } from '../util/function'
import { Download, Upload } from '@element-plus/icons-vue'

const store = useStore()
</script>
