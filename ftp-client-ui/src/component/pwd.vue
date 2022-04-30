<template>
  <el-input v-model="computedPwd" style="margin-bottom: 15px" @keyup.enter="emit('pwd-enter', computedPwd)">
    <template #prepend>
      <el-button @click="emit('back-click')">
        <el-icon>
          <arrow-left />
        </el-icon>
      </el-button>
    </template>
    <template #append>
      <PopInput v-model:value="state.mkdir" @confirm="emit('mkdir-click', state.mkdir)">
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
import { ArrowLeft, FolderAdd } from '@element-plus/icons-vue'
import { computed, reactive } from 'vue'
import PopInput from '../component/pop-input.vue'

const props = defineProps({
  pwd: { type: String }
})

const emit = defineEmits(['update:pwd', 'pwd-enter', 'mkdir-click', 'back-click'])

const state = reactive({
  mkdir: ''
})

const computedPwd = computed({
  get: () => props.pwd,
  set: value => emit('update:pwd', value)
})
</script>
