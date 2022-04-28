import http from '../util/http'

export async function ls(src) {
  return http
    .request({
      url: '/fs/ls',
      method: 'GET',
      params: { src }
    })
    .then(response => response.data)
}

export async function mkdir(dst) {
  return http
    .request({
      url: '/fs/mkdir',
      method: 'POST',
      params: { dst }
    })
    .then(response => response.data)
}

export async function rm(src) {
  return http
    .request({
      url: '/fs/rm',
      method: 'DELETE',
      params: { src }
    })
    .then(response => response.data)
}

export async function mv(src, dst) {
  return http
    .request({
      url: '/fs/mv',
      method: 'PUT',
      params: { src, dst }
    })
    .then(response => response.data)
}

export default { ls, mkdir, rm, mv }
