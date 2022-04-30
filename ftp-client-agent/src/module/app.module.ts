import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { DB_PATH } from '../config'
import { SessionModule } from './session/session.module'
import { FSModule } from './fs/fs.module'
import { FTPModule } from './ftp/ftp.module'
import { OSModule } from './os/os.module'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from '../filter/http-exception.filter'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: DB_PATH,
      autoLoadEntities: true,
      synchronize: true
    }),
    SessionModule,
    OSModule,
    FSModule,
    FTPModule
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }]
})
export class AppModule {}
