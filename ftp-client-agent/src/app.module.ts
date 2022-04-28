import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { DB_PATH } from './config'
import { SessionModule } from './modules/session/session.module'
import { FSModule } from './modules/fs/fs.module'
import { FTPModule } from './modules/ftp/ftp.module'
import { OSModule } from './modules/os/os.module'

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
  ]
})
export class AppModule {}
