import { Module } from '@nestjs/common'
import { TaskController } from './task.controller'
import { TaskGateway } from './task.gateway'

@Module({
  providers: [TaskGateway],
  controllers: [TaskController]
})
export class TaskModule {}
