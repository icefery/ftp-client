import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { DB_PATH } from './config'
import { SessionModule } from './modules/session/session.module'
import { FSModule } from './modules/fs/fs.module'
import { FTPModule } from './modules/ftp/ftp.module'
import { FTPGateway } from './modules/ftp/ftp.gateway'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: DB_PATH,
      autoLoadEntities: true
    }),
    SessionModule,
    FSModule,
    FTPModule,
    FTPGateway
  ]
})
export class AppModule {}