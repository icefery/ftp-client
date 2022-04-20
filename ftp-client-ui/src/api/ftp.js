import { io } from 'socket.io-client'
import { message } from 'ant-design-vue'
import { WS_BASE_URL } from '../config'

export async function ls(sessionId, src) {
  return new Promise((resolve, reject) => {
    const socket = io(`${WS_BASE_URL}/ftp`)
    socket.on('connect', () => {
      socket.emit('/task/ls', { sessionId, src }, (r) => {
        if (r.code !== 0) {
          reject(new Error(r.message))
        } else {
          resolve(r.data)
        }
        socket.close()
      })
    })
    socket.on('connect_error', () => {
      console.log('connect_error')
      message.error(`connect_error`)
      reject(new Error(`connect_error`))
    })
  })
}

export async function rm(sessionId, src) {
  return new Promise((resolve, reject) => {
    const socket = io(`${WS_BASE_URL}/ftp`)
    socket.on('connect', () => {
      socket.emit('/task/rm', { sessionId, src }, (r) => {
        console.log(`r = ${r}`)
        if (r.code !== 0) {
          reject(new Error(r.message))
        } else {
          resolve()
        }
        socket.close()
      })
    })
    socket.on('connect_error', () => {
      message.error(`connect_error`)
      reject(new Error(`connect_error`))
    })
  })
}

export async function mv(sessionId, src, dst) {
  console.log('开始重命名')
  return new Promise((resolve, reject) => {
    const socket = io(`${WS_BASE_URL}/ftp`)
    socket.on('connect', () => {
      socket.emit('/task/mv', { sessionId, src, dst }, (r) => {
        console.log(r)
        if (r.code !== 0) {
          reject(new Error(r.message))
        } else {
          resolve()
        }
        socket.close()
      })
    })
    socket.on('connect_error', () => {
      message.error(`connect_error`)
      reject(new Error(`connect_error`))
    })
  })
}

export async function mkdir(sessionId, dst) {
  return new Promise((resolve, reject) => {
    const socket = io(`${WS_BASE_URL}/ftp`)
    socket.on('connect', () => {
      socket.emit('/mkdir', { sessionId, dst }, (r) => {
        if (r.code !== 0) {
          reject(new Error(r.message))
        } else {
          resolve()
        }
        socket.close()
      })
    })
    socket.on('connect_error', () => {
      message.error(`connect_error`)
      reject(new Error(`connect_error`))
    })
  })
}
