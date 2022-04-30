import { Session } from '../session/session.entity'
import * as Client from 'ssh2-sftp-client'

import { File } from '../fs/fs.interface'
import * as path from 'path'
import * as dayjs from 'dayjs'
import { SFTP_TIMEOUT } from '../../config'

export async function access(session: Session): Promise<void> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  await client.end()
}

export async function ls(session: Session, srcPath: string): Promise<File[]> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  const result = (await client.list(srcPath)).reduce<File[]>((prev, curr) => {
    if (curr.type === 'd' || curr.type === '-') {
      prev.push({
        name: curr.name,
        type: curr.type,
        path: path.posix.join(srcPath, curr.name),
        size: curr.size,
        time: dayjs(curr.modifyTime).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    return prev
  }, [])
  await client.end()
  return result
}

export async function mkdir(session: Session, dst: string): Promise<void> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  await client.mkdir(dst, true)
  await client.end()
}

export async function mv(session: Session, src, dst: string): Promise<void> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  await client.rename(src, dst)
  await client.end()
}

export async function rm(session: Session, src: string): Promise<void> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  try {
    await client.delete(src, true)
  } catch (e) {
    await client.rmdir(src, true)
  }
  await client.end()
}

export async function put(
  session: Session,
  src: string,
  dst: string,
  callback: (total: number, current: number) => void
): Promise<void> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  await client.fastPut(src, dst, {
    step: (totalTransferred, chunk, total) => callback(total, totalTransferred)
  })
  await client.end()
}

export async function get(
  session: Session,
  src: string,
  dst: string,
  callback: (total: number, current: number) => void
): Promise<void> {
  const client = new Client()
  await client.connect({
    host: session.host,
    port: session.port,
    username: session.user,
    password: session.pass,
    readyTimeout: SFTP_TIMEOUT
  })
  await client.fastGet(src, dst, {
    step: (totalTransferred, chunk, total) => callback(total, totalTransferred)
  })
  await client.end()
}
