import { ElMessage } from 'element-plus'
import sessionAPI from '../api/session.api'

export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
export const ACTION__F5 = 'ACTION__F5'
export const ACTION__REMOVE = 'ACTION__REMOVE'
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
  [ACTION__F5]: async ({ commit }) => {
    const r = await sessionAPI.list()
    if (r.code !== 0) {
      ElMessage({ type: 'error', message: '加载失败', grouping: true })
    } else {
      const trees = [
        { name: '本地会话', data: { name: 'local', type: 'FS' } },
        {
          name: '默认分组',
          children: r.data.map(it => ({ name: it.name, data: it }))
        }
      ]
      commit(MUTATION__MERGE_STATE, { sessions: r.data, trees })
    }
  },
  // 保存
  [ACTION__SAVE]: async ({ commit, dispatch }, { session }) => {
    let r
    if (session.id) {
      r = await sessionAPI.update(session.id, session)
    } else {
      r = await sessionAPI.create(session)
    }
    if (r.code !== 0) {
      ElMessage({ type: 'error', message: '保存失败', grouping: true })
    } else {
      await dispatch(ACTION__F5)
    }
  },
  // 删除
  [ACTION__REMOVE]: async ({ commit, dispatch }, { session }) => {
    const r = await sessionAPI.remove(session.id)
    if (r.code !== 0) {
      ElMessage({ type: 'error', message: '删除失败', grouping: true })
    } else {
      await dispatch(ACTION__F5)
    }
  }
}

export default { namespaced: true, state, mutations, actions }
