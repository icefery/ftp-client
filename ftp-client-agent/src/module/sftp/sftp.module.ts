import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SFTPGateway } from './sftp.gateway'
import { SFTPController } from './sftp.controller'
import { Session } from '../session/session.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SFTPGateway],
  controllers: [SFTPController]
})
export class SFTPModule {}
