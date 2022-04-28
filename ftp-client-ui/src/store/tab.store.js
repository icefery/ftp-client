import { ElMessage } from 'element-plus'
import fsAPI from '../api/fs.api'
import ftpAPI from '../api/ftp.api'

export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
export const ACTION__CURRENT = 'ACTION__CURRENT'
export const ACTION__CONNECT = 'ACTION__CONNECT'
export const ACTION__DISCONNECT = 'ACTION__DISCONNECT'
export const ACTION__CD = 'ACTION__CD'
export const ACTION__LS_PWD = 'ACTION__LS_PWD'
export const ACTION__MKDIR = 'ACTION__MKDIR'
export const ACTION__RM = 'ACTION__RM'
export const ACTION__MV = 'ACTION__MV'

const state = {
  tabs: new Map([['本地会话', { title: '本地会话', session: { name: '本地会话', type: 'FS' }, pwd: '/Users/icefery', ls: [] }]]),
  current: null
}

const mutations = {
  [MUTATION__MERGE_STATE]: (state, payload) => Object.assign(state, payload)
}

const actions = {
  // 切换当前会话
  [ACTION__CURRENT]: async ({ state, commit, dispatch }, { title }) => {
    const current = state.tabs.get(title)
    commit(MUTATION__MERGE_STATE, { current })
  },
  // 建立会话连接
  [ACTION__CONNECT]: async ({ state, commit, dispatch }, { session }) => {
    let r
    if (session.type === 'FS') {
      r = await fsAPI.ls('/Users/icefery')
    } else if (session.type === 'FTP') {
      r = await ftpAPI.ls(session.id, '/home/icefery')
    }
    if (r.code !== 0) {
      ElMessage({ type: 'error', message: '连接失败', grouping: true })
    } else {
      state.tabs.set(session.name, { title: session.name, session, pwd: '/home/icefery', ls: r.data })
      commit(MUTATION__MERGE_STATE, { tabs: state.tabs })
    }
  },
  // 取消会话连接
  [ACTION__DISCONNECT]: async ({ state, commit, dispatch }, { title }) => {
    if (state.tabs.has(title)) {
      state.tabs.delete(title)
      commit(MUTATION__MERGE_STATE, { tabs: state.tabs })
    }
  },
  // cd ${src} && ls $(pwd)
  [ACTION__CD]: async ({ state, commit, dispatch }, { title, src }) => {
    const tab = state.tabs.get(title)
    if (tab) {
      let r
      if (tab.session.type === 'FS') {
        r = await fsAPI.ls(src)
      } else if (tab.session.type === 'FTP') {
        r = await ftpAPI.ls(tab.session.id, src)
      }
      if (r.code !== 0) {
        ElMessage({ type: 'error', message: '加载失败', grouping: true })
      } else {
        Object.assign(tab, { pwd: src, ls: r.data })
        commit(MUTATION__MERGE_STATE, { tabs: state.tabs })
      }
    }
  },
  // mkdir -p
  [ACTION__MKDIR]: async ({ state, commit, dispatch }, { title, dst }) => {
    if (state.tabs.has(title)) {
      const tab = state.tabs.get(title)
      let r
      if (tab.session.type === 'FS') {
        r = await fsAPI.mkdir(dst)
      } else if (tab.session.type === 'FTP') {
        r = await ftpAPI.mkdir(tab.session.id, dst)
      }
      if (r.code !== 0) {
        ElMessage({ type: 'error', message: '创建失败', grouping: true })
      } else {
        ElMessage({ type: 'success', message: '创建成功', grouping: true })
        await dispatch(ACTION__CD, { title, src: tab.pwd })
      }
    }
  },
  // rm
  [ACTION__RM]: async ({ state, commit, dispatch }, { title, src }) => {
    if (state.tabs.has(title)) {
      const tab = state.tabs.get(title)
      let r
      if (tab.session.type === 'FS') {
        r = await fsAPI.rm(src)
      } else if (tab.session.type === 'FTP') {
        r = await ftpAPI.rm(tab.session.id, src)
      }
      if (r.code !== 0) {
        ElMessage({ type: 'error', message: '删除失败', grouping: true })
      } else {
        ElMessage({ type: 'success', message: '删除成功', grouping: true })
        await dispatch(ACTION__CD, { title, src: tab.pwd })
      }
    }
  },
  // mv
  [ACTION__MV]: async ({ state, commit, dispatch }, { title, src, dst }) => {
    if (state.tabs.has(title)) {
      const tab = state.tabs.get(title)
      let r
      if (tab.session.type === 'FS') {
        r = await fsAPI.mv(src, dst)
      } else if (tab.session.type === 'FTP') {
        r = await ftpAPI.mv(tab.session.id, src, dst)
      }
      if (r.code !== 0) {
        ElMessage({ type: 'error', message: '修改失败', grouping: true })
      } else {
        ElMessage({ type: 'success', message: '修改成功', grouping: true })
        await dispatch(ACTION__CD, { title, src: tab.pwd })
      }
    }
  }
}

export default { namespaced: true, state, mutations, actions }
