import http from '../util/http'
import ws from '../util/ws'

export async function ls(sessionId, src) {
  return http
    .request({
      url: '/ftp/ls',
      method: 'GET',
      params: { sessionId, src }
    })
    .then(response => response.data.data)
}

export async function mkdir(sessionId, dst) {
  return http
    .request({
      url: '/ftp/mkdir',
      method: 'POST',
      params: { sessionId, dst }
    })
    .then(response => response.data.data)
}

export async function rm(sessionId, src) {
  return http
    .request({
      url: '/ftp/rm',
      method: 'DELETE',
      params: { sessionId, src }
    })
    .then(response => response.data.data)
}

export async function mv(sessionId, src, dst) {
  return http
    .request({
      url: '/ftp/mv',
      method: 'PUT',
      params: { sessionId, src, dst }
    })
    .then(response => response.data.data)
}

export async function get(sessionId, src, dst, callback) {
  const eventHandlers = new Map([['/ftp/get/progress', (event, data) => callback(data.total, data.current)]])
  return ws.emit('/ftp/get', { sessionId, src, dst }, eventHandlers)
}

export async function put(sessionId, src, dst, callback) {
  const eventHandlers = new Map([['/ftp/put/progress', (event, data) => callback(data.total, data.current)]])
  return ws.emit('/ftp/put', { sessionId, src, dst }, eventHandlers)
}

export default { ls, mkdir, rm, mv, get, put }
