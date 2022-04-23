import http from '../utils/http'
import qs from 'qs'

export async function ls(src) {
  return http.get('/fs/ls', { params: { src } }).then((response) => response.data.data)
}

export async function mkdir(dst) {
  // return http.post(`/fs/mkdir`, qs.stringify({ dst }), ).then((response) => response.data.data)
  return http.request({
    url: '/fs/mkdir',
    method: 'POST',
    params: { dst }
  })
}

export async function rm(src) {
  return http.delete('/fs/rm', { params: { src } }).then((response) => response.data.data)
}

export async function mv(src, dst) {
  return http.put('/fs/mv', { params: { src, dst } }).then((response) => response.data.data)
}
