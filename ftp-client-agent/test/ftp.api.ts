import { io } from 'socket.io-client'
const URL = 'ws://localhost:8000/ftp'

export interface IFile {
  type: 'd' | '-'
  name: string
  path: string
  size: number
}

export interface IR<T = void> {
  code: number
  message: string
  data: T
}

export function ls(sessionId: number, src: string): Promise<IFile[]> {
  return new Promise<IFile[]>((resolve, reject) => {
    const socket = io(URL)
    socket.on('connect', () => {
      socket.emit('/task/ls', { sessionId, src }, (r) => {
        const { code, message, data } = r
        if (code === 0) {
          resolve(data)
        } else {
          reject(message)
        }
      })
    })
  })
}

export function mkdir(sessionId: number, dst: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const socket = io(URL)
    socket.on('connect', () => {
      socket.emit('/task/mkdir', { sessionId, dst }, (r) => {
        const { code, message } = r
        if (code === 0) {
          resolve()
        } else {
          reject(message)
        }
      })
    })
  })
}
