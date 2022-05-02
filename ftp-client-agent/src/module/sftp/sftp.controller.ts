import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import R from '../../util/r'
import { get, ls, mkdir, mv, put, rm } from './sftp.function'
import { File } from '../fs/fs.type'
import * as dayjs from 'dayjs'
import { context, updateTask } from '../../context'
import { LOCAL_SESSION } from '../../config'

@Controller('/sftp')
export class SFTPController {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  @Get('/ls')
  async ls(@Query('sessionId') sessionId: number, @Query('src') src: string): Promise<R<File[]>> {
    const session = await this.sessionRepository.findOne({ id: sessionId })
    const data = await ls(session, src)
    return R.success(data)
  }

  @Post('/mkdir')
  async mkdir(@Query('sessionId') sessionId: number, @Query('dst') dst: string): Promise<R<void>> {
    const session = await this.sessionRepository.findOne({ id: sessionId })
    await mkdir(session, dst)
    return R.success()
  }

  @Put('/mv')
  async mv(
    @Query('sessionId') sessionId: number,
    @Query('src') src: string,
    @Query('dst') dst: string
  ): Promise<R<void>> {
    const session = await this.sessionRepository.findOne({ id: sessionId })
    await mv(session, src, dst)
    return R.success()
  }

  @Delete('/rm')
  async rm(@Query('sessionId') sessionId: number, @Query('src') src: string): Promise<R<void>> {
    const session = await this.sessionRepository.findOne({ id: sessionId })
    await rm(session, src)
    return R.success()
  }

  @Post('/put')
  async put(
    @Query('sessionId') sessionId: number,
    @Query('src') src: string,
    @Query('dst') dst: string
  ): Promise<R<void>> {
    const session = await this.sessionRepository.findOne({ id: sessionId })
    const id = context.tasks.length + 1
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await put(session, src, dst, (total, current) => {
      updateTask({
        id,
        time,
        type: 'upload',
        src: { session: LOCAL_SESSION, path: src },
        dst: { session, path: dst },
        progress: { total, current }
      })
    })
    return R.success()
  }

  @Post('/get')
  async get(
    @Query('sessionId') sessionId: number,
    @Query('src') src: string,
    @Query('dst') dst: string
  ): Promise<R<void>> {
    const session = await this.sessionRepository.findOne({ id: sessionId })
    const id = context.tasks.length + 1
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await get(session, src, dst, (total, current) => {
      updateTask({
        id,
        time,
        type: 'download',
        src: { session, path: src },
        dst: { session: LOCAL_SESSION, path: dst },
        progress: { total, current }
      })
    })
    return R.success()
  }
}
