import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import { R } from '../../utils/response'
import { back, get, ls, mkdir, mv, put, rm } from './ftp.function'
import { Client } from 'basic-ftp'
import { IFile } from '../fs/fs.interface'

@WebSocketGateway({ namespace: '/ftp', cors: { origin: '*' } })
export class FTPGateway {
  private readonly ctx: Map<number, Client> = new Map<number, Client>()

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  async beforeCommand(sessionId: number): Promise<void> {
    if (!this.ctx.has(sessionId) || this.ctx.get(sessionId).closed) {
      const session = await this.sessionRepository.findOneBy({ id: sessionId })
      if (!session) {
        throw new WsException(`Session [${sessionId}] does not exist`)
      }
      const client = new Client()
      await client.access({ host: session.host, port: session.port, user: session.user, password: session.pass })
      this.ctx.set(sessionId, client)
    }
  }

  @SubscribeMessage('/task/ls')
  async ls(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string
  ): Promise<R<IFile[]>> {
    await this.beforeCommand(sessionId)
    const data = await ls(this.ctx.get(sessionId), src)
    return R.success(data)
  }

  @SubscribeMessage('/task/mkdir')
  async mkdir(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    await mkdir(this.ctx.get(sessionId), dst)
    return R.success()
  }

  @SubscribeMessage('/task/bask')
  async back(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string
  ): Promise<R<string>> {
    await this.beforeCommand(sessionId)
    const data = await back(this.ctx.get(sessionId), src)
    return R.success(data)
  }

  @SubscribeMessage('/task/mv')
  async mv(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    await mv(this.ctx.get(sessionId), src, dst)
    return R.success()
  }

  @SubscribeMessage('/task/rm')
  async rm(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    await rm(this.ctx.get(sessionId), src)
    return R.success()
  }

  @SubscribeMessage('/task/put')
  async put(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    const callback = (total, current) => socket.emit('/taks/put/progress', { total, current })
    await put(this.ctx.get(sessionId), src, dst, callback)
    return R.success()
  }

  @SubscribeMessage('/task/get')
  async get(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    const callback = (total, current) => socket.emit('/taks/get/progress', { total, current })
    await get(this.ctx.get(sessionId), src, dst, callback)
    return R.success()
  }

  @SubscribeMessage('/task/active')
  async active(@ConnectedSocket() socket: Socket): Promise<R<number[]>> {
    const data = [ ...this.ctx.keys() ]
    return R.success(data)
  }

  @SubscribeMessage('/task/access')
  async access(@ConnectedSocket() socket: Socket, @MessageBody('sessionId') sessionId: number): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    return R.success()
  }
}
