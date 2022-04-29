import { createStore } from 'vuex'
import sessionModule from './session.store'
import tabModule from './tab.store'
import taskModule from './task.store'

export default createStore({
  modules: { sessionModule, tabModule, taskModule }
})
