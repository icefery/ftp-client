import axios from 'axios'
import { ElMessage } from 'element-plus'

import { io } from 'socket.io-client'

import { HTTP_BASE_URL, WS_BASE_URL } from '../config'

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
    console.log(error)
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

const ws = {
  emit: (event, data, ...handlers) => {
    return new Promise((resolve, reject) => {
      const socket = io(`${WS_BASE_URL}`)
      socket.on('connect', () => {
        socket.emit(event, data, (r) => {
          if (r.code !== 0) {
            ElMessage.error(r.message)
            reject(new Error(r.message))
          } else {
            resolve(r)
          }
        })
      })
      socket.on('connect_error', (error) => {
        console.log(error)
        reject(error)
      })
      handlers.forEach((handler) => {
        socket.on(handler.event, (r) => handler.callback(r))
      })
    })
  }
}

export { http, ws }
