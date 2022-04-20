import * as path from 'path'

import { IFile } from '../fs/fs.interface'

import { Client, FileType } from 'basic-ftp'

export async function ls(client: Client, src: string): Promise<IFile[]> {
  const list = await client.list(src)
  return list.reduce<IFile[]>((prev, curr) => {
    const filename = curr.name
    const filepath = path.posix.join(src, filename)
    const filesize = curr.size
    const filetype = curr.type === FileType.Directory ? 'd' : curr.type === FileType.File ? '-' : 'unknown'
    if (filetype !== 'unknown') {
      prev.push({ type: filetype, name: filename, path: filepath, size: filesize })
    }
    return prev
  }, [])
}

export async function mkdir(client: Client, dst: string): Promise<void> {
  await client.ensureDir(dst)
}

export async function mv(client: Client, src: string, dst: string): Promise<void> {
  await client.ensureDir(path.posix.dirname(dst))
  await client.rename(dst, src)
}

export async function rm(client: Client, src: string): Promise<void> {
  await client.removeDir(src)
}

export async function put(
  client: Client,
  src: string,
  dst: string,
  callback: (total: number, current: number) => void
): Promise<void> {
  client.trackProgress((info) => callback(info.bytesOverall, info.bytes))
  await client.uploadFrom(src, dst)
  client.trackProgress()
}

export async function get(
  client: Client,
  src: string,
  dst: string,
  callback: (total: number, current: number) => void
): Promise<void> {
  client.trackProgress((info) => callback(info.bytesOverall, info.bytes))
  await client.downloadTo(src, dst)
  client.trackProgress()
}
