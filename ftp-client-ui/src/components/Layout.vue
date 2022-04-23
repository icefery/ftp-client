<template>
  <el-container>
    <el-aside width="200px">
      <el-tree :data="model.aside.data" default-expand-all>
        <template #default="{ node, data }">
          {{ data.name }}
        </template>
      </el-tree>
    </el-aside>
    <el-container>
      <el-main>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-tabs type="border-card">
              <el-tab-pane label="本地会话">
                <SessionTab src="/Users/icefery" :session="{ id: 0, name: 'local', type: 'fs' }" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="12">
            <el-tabs type="border-card">
              <el-tab-pane label="192.192.192.6">
                <SessionTab
                  :session="{
                    id: 1,
                    name: '192.192.192.6',
                    type: 'ftp',
                    host: '192.192.192.6',
                    port: 21,
                    user: 'icefery',
                    pass: 'icefery'
                  }"
                  :src="model.main.right.current.src"
                />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-table :data="model.footer.tasks" size="small" border>
          <el-table-column prop="type" label="任务类型" width="250" show-overflow-tooltip />
          <el-table-column prop="src" label="原始文件" />
          <el-table-column prop="dst" label="目标文件" />
          <el-table-column label="当前进度">
            <template #default="scope">
              <el-progress
                :percentage="(scope.row.current / scope.row.total) * 100"
                :indeterminate="scope.row.current !== scope.row.total"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutMain from './LayoutMain.vue'
import LayoutFooter from './LayoutFooter.vue'
import LayoutAside from './LayoutAside.vue'
import { onMounted, reactive } from 'vue'

import { findAll } from '../api/session'
import * as fs from '../api/fs'
import * as ftp from '../api/ftp'
import SessionTab from './session-tab/index.vue'

const model = reactive({
  aside: {
    data: []
  },
  header: {},
  main: {
    left: {
      current: {
        src: '/Users/icefery/',
        data: []
      }
    },
    right: {
      current: {
        src: '/home/icefery',
        data: []
      }
    }
  },
  footer: {
    tasks: [{ type: 'put', src: '/Users/icefery/a.iso', dst: '/home/icefery/a.iso', total: 1000, current: 200 }]
  }
})

onMounted(async () => {
  model.aside.data = [{ id: 0, name: '默认会话', children: await findAll() }]

  model.main.left.current.data = await fs.ls(model.main.left.current.src)

  model.main.right.current.data = await ftp.ls(1, model.main.right.current.src)

  console.log(model)
})
</script>
