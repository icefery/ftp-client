import { Module } from '@nestjs/common'
import { FTPController } from './ftp.controller'
import { FTPGateway } from './ftp.gateway'
import { SessionModule } from '../session/session.module'
import { SessionService } from '../session/session.service'

@Module({
  imports: [SessionModule, SessionService],
  controllers: [FTPController],
  providers: [FTPGateway, SessionModule]
})
export class FTPModule {
}