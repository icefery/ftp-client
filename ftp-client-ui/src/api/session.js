import axios from 'axios'
import { ElMessage } from 'element-plus'
import { HTTP_BASE_URL } from '../config'
const http = axios.create({ baseURL: HTTP_BASE_URL })

http.interceptors.response.use(
  (response) => {
    const r = response.data
    if (r.code !== 0) {
      ElMessage.error(r.message)
    }
    return response
  },
  (error) => {
    ElMessage.error(error.message)
    return error
  }
)
const responseMapper = (response) => response.data.data

export async function findAll() {
  return http.get('/session').then(responseMapper)
}

export async function create(session) {
  return http.post('/session', session).then(responseMapper)
}

export async function update(id, session) {
  return http.put(`/session/${id}`, data).then(responseMapper)
}

export async function remove(id) {
  return http.delete(`/session/${id}`).thenI(responseMapper)
}
