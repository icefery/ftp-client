import { io } from 'socket.io-client'
import { message } from 'ant-design-vue'
import { WS_BASE_URL } from '../config'

import { http, ws } from '../utils/request'

export async function ls(sessionId, src) {
  return ws.emit('/ftp/ls', { sessionId, src })
}

export async function rm(sessionId, src) {
  return ws.emit('/ftp/rm', { sessionId, src })
}

export async function mv(sessionId, src, dst) {
  return ws.emit('/ftp/mv', { sessionId, src, dst })
}

export async function mkdir(sessionId, dst) {
  return ws.emit('/ftp/mkdir', { sessionId, dst })
}

export async function get(sessionId, src, dst, callback) {
  const handler = { event: '/ftp/get/progress', callback }
  return ws.emit('/ftp/get', { sessionId, src, dst }, [handler])
}

export async function put(sessionId, src, dst, callback) {
  const handler = { event: '/ftp/put/progress', callback }
  return ws.emit('/ftp.put', { sessionId, src, dst }, [handler])
}
