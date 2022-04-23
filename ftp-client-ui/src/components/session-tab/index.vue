<template>
  <el-input v-model="model.src" @change="() => ls(model.src)" style="margin-bottom: 15px">
    <template #prepend>
      <el-button>
        <el-icon>
          <arrow-left />
        </el-icon>
      </el-button>
    </template>
    <template #append>
      <el-button @click="model.show = true">
        <el-icon>
          <folder-add />
        </el-icon>
      </el-button>
    </template>
  </el-input>
  <el-table :data="model.ls" style="width: 100%" size="small" border height="500">
    <el-table-column prop="filename" label="文件名称" width="250" sortable show-overflow-tooltip />
    <el-table-column prop="filetype" label="文件类型" sortable />
    <el-table-column prop="filesize" label="文件大小" sortable />
    <el-table-column prop="filetime" label="修改时间" sortable />
  </el-table>

  <el-dialog
    v-model="model.show"
    title="新建文件夹"
    width="30%"
    center
    :show-close="false"
    @close="() => (model.mkdir = '')"
  >
    <el-input v-model="model.mkdir" />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            () => {
              mkdir(model.mkdir)
              model.show = false
            }
          "
          >确认</el-button
        >
        <el-button
          @click="
            () => {
              model.show = false
            }
          "
          >取消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ArrowLeft, FolderAdd } from '@element-plus/icons-vue'
import { onMounted, reactive } from 'vue'
import * as fs from '../../api/fs'
import * as ftp from '../../api/ftp'

const props = defineProps({
  session: { type: Object },
  src: { type: String, default: '' }
})

const model = reactive({
  ls: [],
  dialog: {},
  mkdir: '',
  show: false
})

const ls = async (src) => {
  if (props.session.type === 'fs') {
    model.ls = await fs.ls(src)
  } else if (props.session.type === 'ftp') {
    model.ls = await ftp.ls(props.session.id, src)
  }
}

const mkdir = async (dst) => {
  dst = model.src + '/' + dst
  if (props.session.type === 'fs') {
    await fs.mkdir(dst)
    model.ls = await fs.ls(model.src)
  } else if (props.session.type === 'ftp') {
    await ftp.mkdir(dst)
    model.ls = await ftp.ls(props.session.id, model.src)
  }
}

onMounted(async () => {
  model.src = props.src
  await ls(model.src)
})
</script>
