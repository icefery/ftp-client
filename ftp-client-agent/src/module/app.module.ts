import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DB_PATH } from '../config'
import { SessionModule } from './session/session.module'
import { FSModule } from './fs/fs.module'
import { FTPModule } from './ftp/ftp.module'
import { OSModule } from './os/os.module'
import { APP_FILTER } from '@nestjs/core'
import { HTTPExceptionFilter } from '../filter/http-exception.filter'
import { SFTPModule } from './sftp/sftp.module'
import { TaskModule } from './task/task.module'

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
    FTPModule,
    SFTPModule,
    TaskModule
  ],
  providers: [{ provide: APP_FILTER, useClass: HTTPExceptionFilter }]
})
export class AppModule {}
