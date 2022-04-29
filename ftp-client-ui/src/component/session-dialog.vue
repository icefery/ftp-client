<template>
  <el-row :gutter="12">
    <el-col :span="16">
      <el-card style="height: 100%">
        <el-table
          :highlight-current-row="true"
          :data="store.state.sessionModule.sessions"
          size="small"
          :border="true"
          @current-change="row => (model.current = row || { ...props.session }) && (model.editing = { ...row })"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="type" label="类型" width="50">
            <template #default="{ row }">
              <el-tag style="width: 100%; text-align: left">{{ row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="host" label="地址" width="100"></el-table-column>
          <el-table-column prop="port" label="端口" width="50"></el-table-column>
          <el-table-column prop="user" label="用户" width="100"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <el-form :model="model.editing" size="small">
          <el-form-item label="名称">
            <el-input v-model="model.editing.name" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.editing.type" size="small" style="width: 100%">
              <el-option label="FTP" value="FTP" />
              <el-option label="SFTP" value="SFTP" />
            </el-select>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="model.editing.host" />
          </el-form-item>
          <el-form-item label="端口">
            <el-input-number v-model="model.editing.port" :min="1" :max="65535" style="width: 100%" />
          </el-form-item>
          <el-form-item label="用户">
            <el-input v-model="model.editing.user" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="model.editing.pass" type="password" :show-password="true" />
          </el-form-item>
          <el-form-item>
            <el-button-group size="small" style="width: 100%">
              <el-button
                :plain="true"
                :round="true"
                type="primary"
                :disabled="saveButtonDisabled"
                style="width: 50%"
                @click="handleSaveButtonClick"
              >
                保存
              </el-button>
              <el-button
                :plain="true"
                :round="true"
                type="danger"
                style="width: 50%"
                :disabled="model.editing.id ? false : true"
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
import { ACTION__SAVE, ACTION__REMOVE } from '../store/session.store'

const store = useStore()

const props = defineProps({
  session: {
    type: Object,
    default: { id: null, name: '', type: 'FTP', host: '127.0.0.1', port: 21, user: 'ftp', pass: '' }
  }
})

const model = reactive({
  current: { ...props.session },
  editing: { ...props.session }
})

const saveButtonDisabled = computed(() => {
  if (model.editing.name === '') {
    return true
  }
  const keys = Object.keys(model.current)
  for (const key of keys) {
    if (model.editing[key] !== model.current[key]) {
      return false
    }
  }
  return true
})

const handleSaveButtonClick = async () => {
  await store.dispatch(`sessionModule/${ACTION__SAVE}`, { session: model.editing })
  model.editing = { ...props.session }
}

const handleRemoveButtonClick = async () => {
  await store.dispatch(`sessionModule/${ACTION__REMOVE}`, { session: model.editing })
  model.editing = { ...props.session }
}
</script>
