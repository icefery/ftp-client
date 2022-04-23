import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import { access, get, put } from './ftp.function'

@WebSocketGateway({ namespace: '', cors: { origin: '*' } })
export class FTPGateway {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  @SubscribeMessage('/ftp/put')
  async put(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<void> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = (total, current) => socket.emit('/ftp/put/progress', { total, current })
    await put(session, src, dst, callback)
  }

  @SubscribeMessage('/ftp/get')
  async get(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<void> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = (total, current) => socket.emit('/ftp/get/progress', { total, current })
    await get(session, src, dst, callback)
  }

  @SubscribeMessage('/ftp/access')
  async heartbeat(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('interval') interval: number
  ): Promise<void> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = async () => {
      await access(session)
      socket.emit(`/ftp/heartbeat/${interval}`)
    }
    const timer = setInterval(callback, interval)
    socket.on('disconnect', () => clearInterval(timer))
  }
}
