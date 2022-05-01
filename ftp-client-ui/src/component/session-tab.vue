<template>
  <Pwd
    v-model:pwd="state.pwd"
    @pwd-enter="() => cdAndLs(state.pwd)"
    @back-click="() => back()"
    @mkdir-click="dstName => mkdir(dstName)"
  />
  <Ls
    :index="props.index"
    @dir-double-click="row => cdAndLs(row.path)"
    @mv-click="(srcPath, dstName) => mv(srcPath, dstName)"
    @rm-click="srcPath => rm(srcPath)"
    @upload-click="(srcName, srcPath) => upload(srcName, srcPath, store.state.tabModule.current.pwd)"
    @download-click="(srcName, srcPath) => download(srcName, srcPath, store.state.tabModule.local.pwd)"
  />
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import * as osAPI from '../api/os.api'
import {
  ACTION__CD_AND_LS,
  ACTION__MKDIR,
  ACTION__MV,
  ACTION__RM,
  ACTION__SUBMIT_DOWNLOAD,
  ACTION__SUBMIT_UPLOAD
} from '../store/tab.store'
import Ls from './ls.vue'
import Pwd from './pwd.vue'

const props = defineProps({
  index: { type: Number },
  position: { type: String },
  title: { type: String },
  session: { type: Object }
})

const state = reactive({
  pwd: props.session.init,
  mkdir: '',
  mv: ''
})

const store = useStore()

const cdAndLs = async srcPath => {
  state.pwd = srcPath
  await store.dispatch(`tabModule/${ACTION__CD_AND_LS}`, {
    index: props.index,
    src: srcPath
  })
}

const back = async () => {
  state.pwd = await osAPI.resolve([state.pwd, '..'])
  await cdAndLs(state.pwd)
}

const mkdir = async dstName => {
  const dst = await osAPI.resolve([state.pwd, dstName])
  await store.dispatch(`tabModule/${ACTION__MKDIR}`, {
    index: props.index,
    dst
  })
  state.mkdir = ''
}

const rm = async srcPath => {
  await store.dispatch(`tabModule/${ACTION__RM}`, {
    index: props.index,
    src: srcPath
  })
}

const mv = async (srcPath, dstName) => {
  const dstPath = await osAPI.resolve([state.pwd, dstName])
  await store.dispatch(`tabModule/${ACTION__MV}`, {
    index: props.index,
    src: srcPath,
    dst: dstPath
  })
}

const upload = async (srcName, srcPath, dstPwd) => {
  const dstPath = await osAPI.resolve([dstPwd, srcName])
  await store.dispatch(`tabModule/${ACTION__SUBMIT_UPLOAD}`, {
    dstSession: store.state.tabModule.current.session,
    srcPath,
    dstPath
  })
}

const download = async (srcName, srcPath, dstPwd) => {
  const dstPath = await osAPI.resolve([dstPwd, srcName])
  await store.dispatch(`tabModule/${ACTION__SUBMIT_DOWNLOAD}`, {
    srcSession: store.state.tabModule.current.session,
    srcPath,
    dstPath
  })
}

onMounted(async () => {
  // FTP 和 SFTP 在新建建立连接时请求目录
  if (props.session.type === 'FS') {
    await cdAndLs(state.pwd)
  }
})
</script>
