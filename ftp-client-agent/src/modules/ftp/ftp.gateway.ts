import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import { R } from '../../utils/response'
import { get, ls, mkdir, mv, put, rm } from './ftp.function'
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
    if (!this.ctx.has(sessionId)) {
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
    const client = this.ctx.get(sessionId)
    const data = await ls(client, src)
    return R.success(data)
  }

  @SubscribeMessage('/task/mkdir')
  async mkdir(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    const client = this.ctx.get(sessionId)
    await mkdir(client, dst)
    return R.success()
  }

  @SubscribeMessage('/task/mv')
  async mv(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    const client = this.ctx.get(sessionId)
    await mv(client, src, dst)
    return R.success()
  }

  @SubscribeMessage('/task/rm')
  async rm(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string
  ): Promise<R<void>> {
    await this.beforeCommand(sessionId)
    const client = this.ctx.get(sessionId)
    await rm(client, src)
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
    const client = this.ctx.get(sessionId)
    await put(client, src, dst, (total, current) => socket.emit('/taks/put/progress', { total, current }))
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
    const client = this.ctx.get(sessionId)
    await get(client, src, dst, (total, current) => socket.emit('/taks/get/progress', { total, current }))
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
