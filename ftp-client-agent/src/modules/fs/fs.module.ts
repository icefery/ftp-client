import { Module } from '@nestjs/common'
import { FSController } from './fs.controller'

@Module({
  controllers: [FSController]
})
export class FSModule {}
