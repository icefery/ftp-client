import { createStore } from 'vuex'

export default store = createStore({
  state: {
    aside: {
      data: []
    },
    header: {},
    main: {},
    footer: {
      tasks: []
    }
  },
  mutations: {
    requestAll: () => {}
  }
})
