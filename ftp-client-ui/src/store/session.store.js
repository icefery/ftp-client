import { ElMessage } from 'element-plus'
import * as sessionAPI from '../api/session.api'

// 增量更新
export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
// 刷新
export const ACTION__F5 = 'ACTION__F5'
// 删除会话
export const ACTION__REMOVE = 'ACTION__REMOVE'
// 保存会话
export const ACTION__SAVE = 'ACTION__SAVE'

const state = {
  sessions: [],
  trees: []
}

const mutations = {
  [MUTATION__MERGE_STATE]: (state, payload) => Object.assign(state, payload)
}

const actions = {
  // 刷新
  [ACTION__F5]: async context => {
    const failure = () => ElMessage({ type: 'error', message: '加载失败', grouping: true })
    const success = data => {
      context.commit(MUTATION__MERGE_STATE, {
        sessions: data,
        trees: [{ name: 'default', children: data.map(it => ({ name: it.name, data: it })) }]
      })
    }
    sessionAPI.list().then(success).catch(failure)
  },

  // 保存
  [ACTION__SAVE]: async (context, { session }) => {
    const failure = () => ElMessage({ type: 'error', message: '保存失败', grouping: true })
    const success = async () => {
      ElMessage({ type: 'success', message: '保存成功', grouping: true })
      await context.dispatch(ACTION__F5)
    }
    if (session.id) {
      sessionAPI.update(session.id, session).then(success).catch(failure)
    } else {
      sessionAPI.create(session).then(success).catch(failure)
    }
  },

  // 删除
  [ACTION__REMOVE]: async ({ commit, dispatch }, { session }) => {
    const failure = () => ElMessage({ type: 'error', message: '删除失败', grouping: true })
    const success = async () => await dispatch(ACTION__F5)
    sessionAPI.remove(session.id).then(success).catch(failure)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
