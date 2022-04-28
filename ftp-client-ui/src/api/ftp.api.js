import ws from '../util/ws'
import http from '../util/http'

export async function ls(sessionId, src) {
  return http
    .request({
      url: '/ftp/ls',
      method: 'GET',
      params: { sessionId, src }
    })
    .then(response => response.data)
}

export async function mkdir(sessionId, dst) {
  return http
    .request({
      url: '/ftp/mkdir',
      method: 'POST',
      params: { sessionId, dst }
    })
    .then(response => response.data)
}

export async function rm(sessionId, src) {
  return http
    .request({
      url: '/ftp/rm',
      method: 'DELETE',
      params: { sessionId, src }
    })
    .then(response => response.data)
}

export async function mv(sessionId, src, dst) {
  return http
    .request({
      url: '/ftp/mv',
      method: 'PUT',
      params: { sessionId, src, dst }
    })
    .then(response => response.data)
}

export async function get(sessionId, src, dst, callback) {
  const handler = { event: '/ftp/get/progress', callback }
  return ws.emit('/ftp/get', { sessionId, src, dst }, [handler])
}

export async function put(sessionId, src, dst, callback) {
  const handler = { event: '/ftp/put/progress', callback }
  return ws.emit('/ftp/put', { sessionId, src, dst }, [handler])
}

export default { ls, mkdir, rm, mv, get, put }
