import { WebSocketGateway } from '@nestjs/websockets'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'

@WebSocketGateway({ namespace: '', cors: { origin: '*' } })
export class SFTPGateway {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}
}
