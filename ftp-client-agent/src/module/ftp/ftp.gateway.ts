import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import { access, get, put } from './ftp.function'
import R from '../../util/r'
import { context, updateTask } from '../../context'
import { LOCAL_SESSION } from '../../config'

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
  ): Promise<R<void>> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = (total, current) => {
      updateTask({
        type: 'upload',
        src: { session: LOCAL_SESSION, path: src },
        dst: { session, path: dst },
        progress: { total, current }
      })
      return socket.emit('/ftp/put/progress', { tasks: context.tasks })
    }
    await put(session, src, dst, callback)
    return R.success()
  }

  @SubscribeMessage('/ftp/get')
  async get(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: number,
    @MessageBody('src') src: string,
    @MessageBody('dst') dst: string
  ): Promise<R<void>> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const callback = (total, current) => {
      updateTask({
        type: 'download',
        src: { session, path: src },
        dst: { session: LOCAL_SESSION, path: dst },
        progress: { total, current }
      })
      return socket.emit('/ftp/get/progress', { tasks: context.tasks })
    }
    await get(session, src, dst, callback)
    return R.success()
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
