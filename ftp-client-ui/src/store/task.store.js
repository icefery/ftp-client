import { ElMessage } from 'element-plus'
import * as taskAPI from '../api/task.api'

// 增量更新
export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
// 清理任务
export const ACTION__CLEAR_TASK = 'ACTION__CLEAR_TASK'
// 更新进度
export const ACTION__LISTEN__TASKS = 'ACTION__LISTEN__TASKS'

const state = {
  tasks: []
}

const mutations = {
  [MUTATION__MERGE_STATE]: (state, payload) => Object.assign(state, payload)
}

const actions = {
  [ACTION__LISTEN__TASKS]: async context => {
    const failure = () => ElMessage({ type: 'error', message: '加载失败', grouping: true })
    const success = () => {}
    const callback = tasks => context.commit(MUTATION__MERGE_STATE, { tasks })
    taskAPI.listen(callback).then(success).catch(failure)
  },

  // 清理任务
  [ACTION__CLEAR_TASK]: async (context, { ids }) => {
    const failure = () => ElMessage({ type: 'error', message: '清理失败', grouping: true })
    const success = () => {}
    taskAPI.remove(ids).then(success).catch(failure)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
