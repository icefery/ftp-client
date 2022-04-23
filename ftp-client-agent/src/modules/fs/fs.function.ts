import * as fs from 'fs'
import * as path from 'path'
import { IFile } from './fs.interface'
import * as dayjs from 'dayjs'

export async function ls(src: string): Promise<IFile[]> {
  return fs.readdirSync(src).reduce<IFile[]>((prev, curr) => {
    const filename = curr
    const filepath = path.join(src, filename)
    const stats = fs.statSync(filepath)
    const filetype = stats.isDirectory() ? 'd' : stats.isFile() ? '-' : 'unknown'
    const filesize = stats.size
    const filetime = dayjs(stats.mtime).format('YYYY-MM-DD hh:mm:ss')
    if (filetype !== 'unknown') {
      prev.push({ filetype, filename, filepath, filesize, filetime })
    }
    return prev
  }, [])
}

export async function mkdir(dst: string): Promise<void> {
  fs.mkdirSync(dst, { recursive: true })
}

export async function mv(src: string, dst: string): Promise<void> {
  if (path.dirname(src) !== path.dirname(dst)) {
    fs.mkdirSync(path.dirname(dst), { recursive: true })
  }
  fs.renameSync(src, dst)
}

export async function rm(src: string): Promise<void> {
  fs.rmSync(src, { force: true, recursive: true })
}
