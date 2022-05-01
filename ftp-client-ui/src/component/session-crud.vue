<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <el-card style="height: 100%">
        <el-table
          :border="true"
          :data="store.state.sessionModule.sessions"
          :highlight-current-row="true"
          size="small"
          @current-change="row => (state.current = row || { ...props.session }) && (state.editing = { ...row })"
        >
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="类型" prop="type" width="50">
            <template #default="{ row }">
              <el-tag style="width: 100%; text-align: left">{{ row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="地址" prop="host" width="100"></el-table-column>
          <el-table-column label="端口" prop="port" width="50"></el-table-column>
          <el-table-column label="用户" prop="user" width="100"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <el-form :model="state.editing" size="small">
          <el-form-item label="名称">
            <el-input v-model="state.editing.name" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="state.editing.type" size="small" style="width: 100%">
              <el-option label="FTP" value="FTP" />
              <el-option label="SFTP" value="SFTP" />
            </el-select>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="state.editing.host" />
          </el-form-item>
          <el-form-item label="端口">
            <el-input-number v-model="state.editing.port" :max="65535" :min="1" style="width: 100%" />
          </el-form-item>
          <el-form-item label="用户">
            <el-input v-model="state.editing.user" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="state.editing.pass" :show-password="true" type="password" />
          </el-form-item>
          <el-form-item label="入口">
            <el-input v-model="state.editing.init" />
          </el-form-item>
          <el-form-item>
            <el-button-group size="small" style="width: 100%">
              <el-button
                :disabled="saveButtonDisabled"
                :plain="true"
                :round="true"
                style="width: 50%"
                type="primary"
                @click="handleSaveButtonClick"
              >
                保存
              </el-button>
              <el-button
                :disabled="!state.editing.id"
                :plain="true"
                :round="true"
                style="width: 50%"
                type="danger"
                @click="handleRemoveButtonClick"
              >
                删除
              </el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { ACTION__REMOVE, ACTION__SAVE } from '../store/session.store'

const store = useStore()

const props = defineProps({
  session: {
    type: Object,
    default: {
      id: null,
      name: '',
      type: 'FTP',
      host: '127.0.0.1',
      port: 21,
      user: 'ftp',
      pass: '',
      init: ''
    }
  }
})

const state = reactive({
  current: { ...props.session },
  editing: { ...props.session }
})

const saveButtonDisabled = computed(() => {
  if (state.editing.name === '') {
    return true
  }
  const keys = Object.keys(state.current)
  for (const key of keys) {
    if (state.editing[key] !== state.current[key]) {
      return false
    }
  }
  return true
})

const handleSaveButtonClick = async () => {
  await store.dispatch(`sessionModule/${ACTION__SAVE}`, {
    session: state.editing
  })
  state.editing = { ...props.session }
}

const handleRemoveButtonClick = async () => {
  await store.dispatch(`sessionModule/${ACTION__REMOVE}`, {
    session: state.editing
  })
  state.editing = { ...props.session }
}
</script>
