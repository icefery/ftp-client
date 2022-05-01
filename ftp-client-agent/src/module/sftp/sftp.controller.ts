import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import R from '../../util/r'
import { ls, mkdir, mv, rm } from './sftp.function'
import { File } from '../fs/fs.type'

@Controller('/sftp')
export class SFTPController {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  @Get('/ls')
  async ls(@Query('sessionId') sessionId: number, @Query('src') src: string): Promise<R<File[]>> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const data = await ls(session, src)
    return R.success(data)
  }

  @Post('/mkdir')
  async mkdir(@Query('sessionId') sessionId: number, @Query('dst') dst: string): Promise<R<void>> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    await mkdir(session, dst)
    return R.success()
  }

  @Put('/mv')
  async mv(
    @Query('sessionId') sessionId: number,
    @Query('src') src: string,
    @Query('dst') dst: string
  ): Promise<R<void>> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    await mv(session, src, dst)
    return R.success()
  }

  @Delete('/rm')
  async rm(@Query('sessionId') sessionId: number, @Query('src') src: string): Promise<R<void>> {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    await rm(session, src)
    return R.success()
  }
}
