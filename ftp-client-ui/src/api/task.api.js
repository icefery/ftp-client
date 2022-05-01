import http from '../util/http'
import ws from '../util/ws'

export async function remove(ids) {
  return http
    .request({
      url: `/task/`,
      method: 'DELETE',
      data: ids
    })
    .then(response => response.data.data)
}

export async function listen(callback) {
  const handlers = new Map([['/task/listen/tasks', (socket, event, data) => callback(data.tasks)]])
  return ws.emit('/task/listen', {}, handlers)
}
