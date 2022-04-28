import { createStore } from 'vuex'
import sessionModule from './session.store'
import tabModule from './tab.store'

export default createStore({
  modules: { sessionModule, tabModule }
})
