<template>
  <el-input v-model="model.pwd" @input="emit('update:pwd', model.pwd)" @keyup.enter="cd()" style="margin-bottom: 15px">
    <template #prepend>
      <el-button @click="back()">
        <el-icon>
          <arrow-left />
        </el-icon>
      </el-button>
    </template>
    <template #append>
      <PopInput v-model:value="model.mkdir" @confirm="mkdir()">
        <el-button>
          <el-icon>
            <folder-add />
          </el-icon>
        </el-button>
      </PopInput>
    </template>
  </el-input>
</template>

<script setup>
import { onUpdated, reactive } from 'vue'
import { useStore } from 'vuex'

import { ArrowLeft, FolderAdd } from '@element-plus/icons-vue'
import PopInput from '../pop-input.vue'
import { ACTION__CD, ACTION__MKDIR } from '../../store/tab.store'

import osAPI from '../../api/os.api'

const store = useStore()

const props = defineProps({
  tab: { type: Object },
  pwd: { type: String, default: '' }
})

const emit = defineEmits(['update:pwd', 'pwd-enter', 'mkdir-click', 'back-click'])

const model = reactive({
  pwd: props.pwd,
  mkdir: ''
})

const cd = async () => {
  await store.dispatch(`tabModule/${ACTION__CD}`, { title: props.tab.title, src: model.pwd })
}

const back = async () => {
  // TODO
  const r = await osAPI.resolve([model.pwd, '..'])
  model.pwd = r.data
  await cd()
  emit('update:pwd', model.pwd)
}

const mkdir = async () => {
  // TODO
  const r = await osAPI.resolve([model.pwd, model.mkdir])
  const dst = r.data
  await store.dispatch(`tabModule/${ACTION__MKDIR}`, { title: props.tab.title, dst })
  console.log('执行完')
}

onUpdated(() => {
  model.pwd = props.pwd
})
</script>
