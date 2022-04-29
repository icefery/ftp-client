export const MUTATION__MERGE_STATE = 'MUTATION__MERGE_STATE'
export const ACTION__TASK = 'ACTION__UPDATE_TASK'

const template = {
  src: {
    session: { name: 'local', type: 'fs' },
    filepath: '/Users/icefery/a.txt'
  },
  dst: {
    session: {name: 'node6', type: 'ftp', host: '192.192.192.6'},
    filepath: '/home/icefery.xyz'
  }
}

const state = {
  tasks: []
}


const mutations = {
  [ACTION__TASK]: async ({ state, commit, dispatch }, { task }) => {

  }
}