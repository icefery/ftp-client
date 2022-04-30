import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import { Socket } from 'socket.io'
import { get, put } from './sftp.function'

@WebSocketGateway({ namespace: '', cors: { origin: '*' } })
export class SFTPGateway {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  @SubscribeMessage('/sftp/put')
  async put(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<void> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = (total, current) => socket.emit('/sftp/put/progress', { total, current })
    await put(session, src, dst, callback)
  }

  @SubscribeMessage('/sftp/get')
  async get(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<void> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = (total, current) => socket.emit('/sftp/get/progress', { total, current })
    await get(session, src, dst, callback)
  }
}
