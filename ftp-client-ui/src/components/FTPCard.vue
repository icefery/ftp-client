<template>
  <a-table :data-source="data.ls" :bordered="true" size="small" :show-header="false">
    <a-table-column title="文件类型" data-index="type">
      <template #default="{ record }">
        <template v-if="record.type === '-'">
          <file-outlined />
        </template>
        <template v-else-if="record.type === 'd'">
          <folder-outlined />
        </template>
      </template>
    </a-table-column>
    <a-table-column title="文件名称" data-index="name">
      <template #default="{ record }">
        <a-tooltip placement="top">
          <template #title>
            <span>{{ record.path }}</span>
          </template>
          <n-code>{{ record.name }}</n-code>
        </a-tooltip>
      </template>
    </a-table-column>
    <a-table-column title="文件大小" data-index="size">
      <template #default="{ record }">
        {{ formatSize(record.size) }}
      </template>
    </a-table-column>
    <a-table-column>
      <template #default="{ record }">
        <span>
          <a-button type="text" @click="() => handleRename(record)">重命名</a-button>
          <a-divider type="vertical" />
          <a-button type="text" @click="() => handleRemove(record)">删除</a-button>
          <a-divider type="vertical" />
          <a-button type="text">上传</a-button>
        </span>
      </template>
    </a-table-column>
  </a-table>
</template>

<script setup>
import { FileOutlined, FolderOutlined } from '@ant-design/icons-vue'

import { onMounted, reactive } from 'vue'

import { ls, mv, rm } from '../api/ftp'
import { formatSize } from '../utils/fs'

const data = reactive({
  ls: []
})

onMounted(async () => {
  data.ls = await ls(1, '/home/icefery/test')
})

const handleRemove = async (record) => {
  console.log(record)
  await rm(1, record.path)
}

const handleRename = async (record) => {
  console.log('发起重命名')
  await mv(1, '/home/icefery/test/b.txt', '/home/icefery/test/c.txt')
}
</script>
