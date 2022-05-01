import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import { access } from './ftp.function'

@WebSocketGateway({ namespace: '', cors: { origin: '*' } })
export class FTPGateway {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

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
