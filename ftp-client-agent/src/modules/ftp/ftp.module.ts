import { Module } from '@nestjs/common'
import { FTPGateway } from './ftp.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [FTPGateway]
})
export class FTPModule {}
