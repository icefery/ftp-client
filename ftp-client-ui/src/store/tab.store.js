import { ElMessage } from 'element-plus'
import fsAPI from '../api/fs.api'
import ftpAPI from '../api/ftp.api'
import { LOCAL_INIT } from '../config'
import { ACTION__UPDATE_TASK_PROGRESS } from './task.store'

// 增量更新
export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
// 切换当前会话
export const ACTION__CHANGE_CURRENT = 'ACTION__CHANGE_CURRENT'
// 建立会话连接
export const ACTION__CONNECT = 'ACTION__CONNECT'
// 断开会话连接
export const ACTION__DISCONNECT = 'ACTION__DISCONNECT'
// cd && ls
export const ACTION__CD_AND_LS = 'ACTION__CD_AND_LS'
// mkdir
export const ACTION__MKDIR = 'ACTION__MKDIR'
// rm
export const ACTION__RM = 'ACTION__RM'
// mv
export const ACTION__MV = 'ACTION__MV'
// put
export const ACTION__PUT = 'ACTION__PUT'
// get
export const ACTION__GET = 'ACTION__GET'

const state = {
  local: {
    position: 'left',
    title: 'local',
    session: { id: -1, name: 'local', type: 'FS', init: LOCAL_INIT },
    pwd: LOCAL_INIT,
    ls: []
  },
  tabs: [],
  current: null
}

const mutations = {
  // 增量更新
  [MUTATION__MERGE_STATE]: (state, payload) => Object.assign(state, payload)
}

const actions = {
  // 切换当前会话
  [ACTION__CHANGE_CURRENT]: async (context, { index }) => {
    if (context.state.tabs.length === 0) {
      context.commit(MUTATION__MERGE_STATE, { current: null })
    } else if (context.state.tabs.length === 1) {
      context.commit(MUTATION__MERGE_STATE, { current: context.state.tabs[0] })
    } else {
      // 下标访问越界会返回 undefined
      const tab = context.state.tabs[index]
      if (tab) {
        context.commit(MUTATION__MERGE_STATE, { current: tab })
      }
    }
  },

  // 建立会话连接
  [ACTION__CONNECT]: async (context, { session }) => {
    const success = data => {
      const tabs = context.state.tabs
      const refs = tabs.filter(it => it.session.name === session.name).length
      tabs.push({
        position: 'right',
        title: refs === 0 ? session.name : `${session.name}-${refs + 1}`,
        session,
        pwd: session.init,
        ls: data
      })
      context.commit(MUTATION__MERGE_STATE, {
        tabs,
        current: tabs.length === 1 ? tabs[0] : context.state.current
      })
    }
    const failure = error => {
      ElMessage({ type: 'error', message: '连接失败', grouping: true })
    }
    const adapter = {
      ['FS']: () => fsAPI.ls(session.init).then(success).catch(failure),
      ['FTP']: () => ftpAPI.ls(session.id, session.init).then(success).catch(failure)
    }
    adapter[session.type]()
  },

  // 断开会话连接
  [ACTION__DISCONNECT]: async (context, { index }) => {
    const tabs = context.state.tabs
    if (tabs[index]) {
      tabs.splice(index, 1)
      context.commit(MUTATION__MERGE_STATE, { tabs })
    }
  },

  // cd && ls
  [ACTION__CD_AND_LS]: async (context, { index, src }) => {
    const tab = index === -1 ? context.state.local : context.state.tabs[index]
    if (tab) {
      const failure = error => {
        ElMessage({ type: 'error', message: '加载失败', grouping: true })
      }
      const success = data => {
        tab.pwd = src
        tab.ls = data
        context.commit(
          MUTATION__MERGE_STATE,
          index === -1 ? { local: context.state.local } : { tabs: context.state.tabs }
        )
      }
      const adapter = {
        ['FS']: () => fsAPI.ls(src).then(success).catch(failure),
        ['FTP']: () => ftpAPI.ls(tab.session.id, src).then(success).catch(failure)
      }
      adapter[tab.session.type]()
    }
  },

  // mkdir
  [ACTION__MKDIR]: async (context, { index, dst }) => {
    const tab = index === -1 ? context.state.local : context.state.tabs[index]
    if (tab) {
      const failure = error => {
        ElMessage({ type: 'error', message: '创建失败', grouping: false })
      }
      const success = async data => {
        ElMessage({ type: 'success', message: '创建成功', grouping: true })
        await context.dispatch(ACTION__CD_AND_LS, { index, src: tab.pwd })
      }
      const adapter = {
        ['FS']: () => fsAPI.mkdir(dst).then(success).catch(failure),
        ['FTP']: () => ftpAPI.mkdir(tab.session.id, dst).then(success).catch(failure)
      }
      adapter[tab.session.type]()
    }
  },

  // rm
  [ACTION__RM]: async (context, { index, src }) => {
    const tab = index === -1 ? context.state.local : context.state.tabs[index]
    if (tab) {
      const failure = error => {
        ElMessage({ type: 'error', message: '删除失败', grouping: false })
      }
      const success = async data => {
        ElMessage({ type: 'success', message: '删除成功', grouping: true })
        await context.dispatch(ACTION__CD_AND_LS, { index, src: tab.pwd })
      }
      const adapter = {
        ['FS']: () => fsAPI.rm(src).then(success).catch(failure),
        ['FTP']: () => ftpAPI.rm(tab.session.id, src).then(success).catch(failure)
      }
      adapter[tab.session.type]()
    }
  },

  // mv
  [ACTION__MV]: async (context, { index, src, dst }) => {
    const tab = index === -1 ? context.state.local : context.state.tabs[index]
    if (tab) {
      const failure = error => {
        ElMessage({ type: 'error', message: '修改失败', grouping: false })
      }
      const success = async data => {
        ElMessage({ type: 'success', message: '修改成功', grouping: true })
        await context.dispatch(ACTION__CD_AND_LS, { index, src: tab.pwd })
      }
      const adapter = {
        ['FS']: () => fsAPI.mv(src, dst).then(success).catch(failure),
        ['FTP']: () => ftpAPI.mv(tab.session.id, src, dst).then(success).catch(failure)
      }
      adapter[tab.session.type]()
    }
  },

  // put
  [ACTION__PUT]: async (context, { dstSession, srcPath, dstPath }) => {
    await ftpAPI.put(dstSession.id, srcPath, dstPath, async (total, current) => {
      await context.dispatch(
        `taskModule/${ACTION__UPDATE_TASK_PROGRESS}`,
        {
          type: 'upload',
          src: { session: context.state.local.session, path: srcPath },
          dst: { session: dstSession, path: dstPath },
          progress: { total, current }
        },
        { root: true }
      )
    })
  },

  // get
  [ACTION__GET]: async (context, { srcSession, srcPath, dstPath }) => {
    await ftpAPI.get(srcSession.id, srcPath, dstPath, async (total, current) => {
      await context.dispatch(
        `taskModule/${ACTION__UPDATE_TASK_PROGRESS}`,
        {
          type: 'download',
          src: { session: srcSession, path: srcPath },
          dst: { session: context.state.local.session, path: dstPath },
          progress: { total, current }
        },
        { root: true }
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
