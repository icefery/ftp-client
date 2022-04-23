import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ls, mkdir, mv, rm } from './ftp.function'
import { InjectRepository } from '@nestjs/typeorm'
import { Session } from '../session/session.entity'
import { Repository } from 'typeorm'
import R from '../../utils/r'

@Controller('/ftp')
export class FTPController {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  @Get('/ls')
  async ls(@Query('sessionId') sessionId: number, @Query('src') src: string) {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    const data = await ls(session, src)
    return R.success(data)
  }

  @Post('/mkdir')
  async mkdir(@Query('sessionId') sessionId: number, @Query('dst') dst: string) {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    await mkdir(session, dst)
    return R.success()
  }

  @Put('/mv')
  async mv(@Query('sessionId') sessionId: number, @Query('src') src: string, @Query('dst') dst: string) {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    await mv(session, src, dst)
    return R.success()
  }

  @Delete('/mv')
  async rm(@Query('sessionId') sessionId: number, @Query('src') src: string) {
    const session = await this.sessionRepository.findOneBy({ id: sessionId })
    await rm(session, src)
    return R.success()
  }
}
