import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Client, FileType } from 'basic-ftp'
import { IFileDTO } from '../fs/fs.dto'
import * as path from 'path'
import { Socket } from 'socket.io'
import { SessionService } from '../session/session.service'

@WebSocketGateway({ cors: { origin: '*' } })
export class FTPGateway {
  constructor(private readonly sessionService: SessionService) {
  }

  @SubscribeMessage('events')
  async findAll(@MessageBody() data: any) {
    return 1
  }

  @SubscribeMessage('test1')
  async test1(@MessageBody() data: any) {
    return data
  }

  @SubscribeMessage('/ls')
  async ls(@ConnectedSocket() socket: Socket, @MessageBody('sessionId') sessionId: number, @MessageBody('src') src: string): Promise<IFileDTO[]> {
    const client = new Client()
    await client.access({
      host: '192.192.192.6',
      port: 21,
      user: 'icefery',
      password: 'icefery'
    })
    const list = await client.list(src)
    const data = list.reduce<IFileDTO[]>((prev, curr) => {
      const filename = curr.name
      const filepath = path.join(src, filename)
      const filesize = curr.size
      const filetype = curr.type === FileType.Directory ? 'd' : curr.type === FileType.File ? '-' : 'unknown'
      if (filetype !== 'unknown') {
        prev.push({ type: filetype, name: filename, path: filepath, size: filesize })
      }
      return prev
    }, [])
    client.close()
    return data
  }

  @SubscribeMessage('/mkdir')
  async mkdir(@ConnectedSocket() socket: Socket, @MessageBody('sessionId') sessionId: number, @MessageBody('dst') dst: string): Promise<void> {
    console.log('请求进来')

    const session = await this.sessionService.findById(sessionId)
    console.log(session)
    const client = new Client()
  }
}