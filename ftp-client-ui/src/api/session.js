import http from '../utils/http'

export async function findAll() {
  return http.get('/session').then((response) => response.data.data)
}

export async function create(session) {
  return http.post('/session', session).then((response) => response.data.data)
}

export async function update(id, session) {
  return http.put(`/session/${id}`, session).then((response) => response.data.data)
}

export async function remove(id) {
  return http.delete(`/session/${id}`).then((response) => response.data.data)
}
