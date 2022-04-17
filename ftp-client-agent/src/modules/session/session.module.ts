import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionEntity } from './session.entity'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity])],
  controllers: [SessionController],
  providers: [SessionService]
})
export class SessionModule {
}