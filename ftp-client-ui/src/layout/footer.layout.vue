<template>
  <el-table :border="true" :data="store.state.taskModule.tasks" size="small">
    <el-table-column align="center" label="任务类型" prop="type" width="100">
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

    <el-table-column :show-overflow-tooltip="true" label="起始路径">
      <template #default="scope">
        {{ scope.row.src.session.name }}
        <el-tag size="small">{{ scope.row.src.session.type }}</el-tag>
        {{ scope.row.src.path }}
      </template>
    </el-table-column>

    <el-table-column :show-overflow-tooltip="true" label="目标路径">
      <template #default="scope">
        {{ scope.row.dst.session.name }}
        <el-tag size="small">{{ scope.row.dst.session.type }}</el-tag>
        {{ scope.row.dst.path }}
      </template>
    </el-table-column>

    <el-table-column align="center" label="任务进度">
      <template #default="scope">
        <el-progress
          :percentage="
            scope.row.progress.total === 0
              ? 0
              : Math.round((scope.row.progress.current / scope.row.progress.total) * 100)
          "
          :status="scope.row.progress.current === scope.row.progress.total ? 'success' : ''"
        >
          {{ formatSize(scope.row.progress.current, 2) }} /
          {{ formatSize(scope.row.progress.total, 2) }}
        </el-progress>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { Download, Upload } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { formatSize } from '../util/function'

const store = useStore()
</script>
