import { Session } from '../session/session.entity'
import { File } from '../fs/fs.interface'
import { Client, FileType } from 'basic-ftp'
import { FTP_TIMEOUT } from '../../config'
import * as path from 'path'
import * as fs from 'fs'
import * as dayjs from 'dayjs'

export async function access(session: Session): Promise<void> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  client.close()
}

export async function ls(session: Session, src: string): Promise<File[]> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  const result = (await client.list(src)).reduce<File[]>((prev, curr) => {
    const filename = curr.name
    const filetype = curr.type === FileType.Directory ? 'd' : curr.type === FileType.File ? '-' : 'unknown'
    const filepath = path.posix.join(src, filename)
    const filesize = curr.size
    const filetime = dayjs(curr.rawModifiedAt).format('YYYY-MM-DD hh:mm:ss')
    if (filetype !== 'unknown') {
      prev.push({ name: filename, type: filetype, path: filepath, size: filesize, time: filetime })
    }
    return prev
  }, [])
  client.close()
  return result
}

export async function mkdir(session: Session, dst: string): Promise<void> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  await client.ensureDir(dst)
  client.close()
}

export async function mv(session: Session, src: string, dst: string): Promise<void> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  await client.ensureDir(path.posix.dirname(dst))
  await client.rename(src, dst)
  client.close()
}

export async function rm(session: Session, src: string): Promise<void> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  try {
    await client.remove(src)
  } catch (e) {
    await client.removeDir(src)
  }
  client.close()
}

export async function put(
  session: Session,
  src: string,
  dst: string,
  callback: (total: number, current: number) => void
): Promise<void> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  const total = fs.statSync(src).size
  client.trackProgress((info) => callback(total, info.bytes))
  await client.uploadFrom(src, dst)
  client.trackProgress()
  client.close()
}

export async function get(
  session: Session,
  src: string,
  dst: string,
  callback: (total: number, current: number) => void
): Promise<void> {
  const client = new Client(FTP_TIMEOUT)
  await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
  const total = await client.size(src)
  client.trackProgress((info) => callback(total, info.bytes))
  await client.downloadTo(dst, src)
  client.trackProgress()
  client.close()
}
