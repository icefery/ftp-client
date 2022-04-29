<template>
  <el-input v-model="newPwd" @keyup.enter="emit('pwd-enter', newPwd)" style="margin-bottom: 15px">
    <template #prepend>
      <el-button @click="emit('back-click')">
        <el-icon>
          <arrow-left />
        </el-icon>
      </el-button>
    </template>
    <template #append>
      <PopInput v-model:value="model.mkdir" @confirm="emit('mkdir-click', model.mkdir)">
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
import { computed, reactive } from 'vue'
import { ArrowLeft, FolderAdd } from '@element-plus/icons-vue'
import PopInput from '../component/pop-input.vue'

const props = defineProps({
  pwd: { type: String }
})

const emit = defineEmits(['update:pwd', 'pwd-enter', 'mkdir-click', 'back-click'])

const model = reactive({
  mkdir: ''
})

const newPwd = computed({
  get: () => props.pwd,
  set: newValue => emit('update:pwd', newValue)
})
</script>
