import { Module } from '@nestjs/common'
import { OSController } from './ftp.controller'

@Module({
  controllers: [OSController]
})
export class OSModule {}
