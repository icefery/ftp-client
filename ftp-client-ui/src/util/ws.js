import { ElMessage } from 'element-plus'

import { io } from 'socket.io-client'

import { WS_BASE_URL } from '../config'

const ws = {
  emit: (event, data, eventHandlers) => {
    return new Promise((resolve, reject) => {
      const socket = io(`${WS_BASE_URL}`)
      socket.on('connect', () => {
        socket.emit(event, data, r => {
          if (r.code !== 0) {
            ElMessage.error(r.message)
            reject(new Error(r.message))
          } else {
            resolve(r)
          }
        })
      })
      socket.on('connect_error', error => {
        console.log(error)
        reject(error)
      })
      eventHandlers.forEach((handler, event) => {
        socket.on(event, data => handler(event, data))
      })
    })
  }
}

export default ws
