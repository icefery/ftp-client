import { io } from 'socket.io-client'
import { WS_BASE_URL } from '../config'

const ws = {
  emit: (event, data, handlers) => {
    return new Promise((resolve, reject) => {
      const socket = io(`${WS_BASE_URL}`)
      socket.on('connect', () => {
        socket.emit(event, data, r => {
          if (r.code !== 0) {
            console.log(r)
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
      handlers.forEach((handler, event) => socket.on(event, data => handler(socket, event, data)))
    })
  }
}

export default ws
