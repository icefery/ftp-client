import http from '../util/http'

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

export async function get(sessionId, src, dst) {
  return http
    .request({
      url: '/ftp/get',
      method: 'POST',
      params: { sessionId, src, dst }
    })
    .then(response => response.data.data)
}

export async function put(sessionId, src, dst) {
  return http
    .request({
      url: '/ftp/put',
      method: 'POST',
      params: { sessionId, src, dst }
    })
    .then(response => response.data.data)
}
