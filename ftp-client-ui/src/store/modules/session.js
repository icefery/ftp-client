import { findAll } from "../../api/session"
const state = {
  data: []
}

const getters = {
  getTreeList() {
    return [
      {
        label: '默认会话',
        data: null,
        children: state.data.map((it) => ({ label: it.name, data: it, children: [] }))
      }
    ]
  }
}

const mutations = {
  findAll: () => {
      // findAll().then()
  }
}
