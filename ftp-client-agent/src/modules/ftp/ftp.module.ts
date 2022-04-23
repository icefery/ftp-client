import { Module } from '@nestjs/common'
import { FTPGateway } from './ftp.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { FTPController } from './ftp.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [FTPGateway],
  controllers: [FTPController]
})
export class FTPModule {}
