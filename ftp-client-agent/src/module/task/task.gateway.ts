import { ConnectedSocket, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { context } from '../../context'
import R from '../../util/r'
import { TASK__REFRESH_INTERVAL } from '../../config'

@WebSocketGateway({ namespace: '', cors: { origin: '*' } })
export class TaskGateway {
  @SubscribeMessage('/task/listen')
  async list(@ConnectedSocket() socket: Socket): Promise<R<void>> {
    const intervalId = setInterval(
      () => socket.emit('/task/listen/tasks', { tasks: context.tasks }),
      TASK__REFRESH_INTERVAL
    )
    socket.on('disconnect', () => clearInterval(intervalId))
    return R.success()
  }
}
