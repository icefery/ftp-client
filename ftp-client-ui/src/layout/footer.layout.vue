<template>
  <el-table :border="true" :data="store.state.taskModule.tasks" size="small">
    <el-table-column align="center" label="类型" prop="type" width="50">
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

    <el-table-column align="center" label="开始时间" prop="time" width="150" />

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

    <el-table-column align="center" label="任务进度" width="300">
      <template #default="scope">
        <el-progress
          :percentage="
            scope.row.progress.total === 0
              ? 0
              : Math.round((scope.row.progress.current / scope.row.progress.total) * 100)
          "
        >
          <span style="font-size: 10px">
            {{ formatSize(scope.row.progress.current, 2) }}/{{ formatSize(scope.row.progress.total, 2) }}
          </span>
        </el-progress>
      </template>
    </el-table-column>

    <el-table-column width="50">
      <template #default="scope">
        <el-button size="small" style="width: 30px" @click="() => removeTask(scope.row.id)">
          <el-icon>
            <delete />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { Delete, Download, Upload } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { ACTION__CLEAR_TASK, ACTION__LISTEN__TASKS } from '../store/task.store'
import { formatSize } from '../util/function'

const store = useStore()

const removeTask = id => {
  store.dispatch(`taskModule/${ACTION__CLEAR_TASK}`, { ids: [id] })
}

onMounted(async () => {
  await store.dispatch(`taskModule/${ACTION__LISTEN__TASKS}`)
})
</script>

<style>
.el-progress-bar__outer {
  width: 180px !important;
}
</style>
