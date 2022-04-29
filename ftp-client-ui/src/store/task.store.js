// 增量更新
export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
// 更新任务进度
export const ACTION__UPDATE_TASK_PROGRESS = 'ACTION__UPDATE_TASK_PROGRESS'
// 清理任务
export const ACTION__CLEAR_TASK = 'ACTION__CLEAR_TASK'

const state = {
  tasks: []
}

const mutations = {
  [MUTATION__MERGE_STATE]: (state, payload) => Object.assign(state, payload)
}

const actions = {
  // 更新任务进度
  [ACTION__UPDATE_TASK_PROGRESS]: async (context, newTask) => {
    console.log('newTask=', context.state, newTask)
    const oldTask = context.state.tasks.find(
      it =>
        it?.type === newTask.type &&
        it?.src?.session?.id === newTask.src.session.id &&
        it?.src?.path === newTask.src.path &&
        it?.dst?.session?.id === newTask.dst.session.id &&
        it?.dst?.path === newTask.dst.path
    )
    if (oldTask) {
      oldTask.progress = newTask.progress
    } else {
      context.state.tasks.push(newTask)
    }
    context.commit(MUTATION__MERGE_STATE, { tasks: context.state.tasks })
  },

  // 清理任务
  [ACTION__CLEAR_TASK]: async (context, {}) => {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
