import { IFile } from '../fs/fs.interface'
import { Session } from '../session/session.entity'
import * as path from 'path'

import { Client, FileType } from 'basic-ftp'

// export async function ls(session: Session, src: string): Promise<IFile[]> {
//   const client = new Client()
//   try {
//     await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
//     const list = await client.list(src)
//     return list.reduce<IFile[]>((prev, curr) => {
//       const filename = curr.name
//       const filepath = path.join(src, filename)
//       const filesize = curr.size
//       const filetype = curr.type === FileType.Directory ? 'd' : curr.type === FileType.File ? '-' : 'unknown'
//       if (filetype !== 'unknown') {
//         prev.push({ type: filetype, name: filename, path: filepath, size: filesize })
//       }
//       return prev
//     }, [])
//   } finally {
//     client.close()
//   }
// }

// export async function mkdir(session: Session, dst: string): Promise<void> {
//   const client = new Client()
//   try {
//     await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
//     await client.ensureDir(dst)
//   } finally {
//     client.close()
//   }
// }

// export async function mv(session: Session, src: string, dst: string): Promise<void> {
//   const client = new Client()
//   try {
//     await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
//     await client.ensureDir(path.dirname(dst))
//     await client.rename(dst, src)
//   } finally {
//     client.close()
//   }
// }

// export async function rm(session: Session, src: string): Promise<void> {
//   const client = new Client()
//   try {
//     await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
//     await client.removeDir(src)
//   } finally {
//     client.close()
//   }
// }

// export async function get(
//   session: Session,
//   src: string,
//   dst: string,
//   callback: (total: number, current: number) => void
// ): Promise<void> {
//   const client = new Client()
//   try {
//     await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
//     client.trackProgress((info) => callback(info.bytesOverall, info.bytes))
//     await client.downloadTo(src, dst)
//     client.trackProgress()
//   } finally {
//     client.close()
//   }
// }

// export async function put(
//   session: Session,
//   src: string,
//   dst: string,
//   callback: (total: number, current: number) => void
// ): Promise<void> {
//   const client = new Client()
//   try {
//     await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
//     client.trackProgress((info) => callback(info.bytesOverall, info.bytes))
//     await client.uploadFrom(src, dst)
//     client.trackProgress()
//   } finally {
//     client.close()
//   }
// }

export async function ls(client: Client, src: string): Promise<IFile[]> {
  const list = await client.list(src)
  return list.reduce<IFile[]>((prev, curr) => {
    const filename = curr.name
    const filepath = path.join(src, filename)
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
  await client.ensureDir(path.dirname(dst))
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
