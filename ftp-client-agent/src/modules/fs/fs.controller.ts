import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'

import { File } from './fs.interface'
import R from '../../utils/r'

import { ls, mkdir, mv, rm } from './fs.function'

@Controller('/fs')
export class FSController {
  @Get('/ls')
  async ls(@Query('src') src: string): Promise<R<File[]>> {
    const data = await ls(src)
    return R.success(data)
  }

  @Post('/mkdir')
  async mkdir(@Query('dst') dst: string): Promise<R<void>> {
    await mkdir(dst)
    return R.success()
  }

  @Delete('/rm')
  async rm(@Query('src') src: string): Promise<R<void>> {
    await rm(src)
    return R.success()
  }

  @Put('/mv')
  async mv(@Query('src') src: string, @Query('dst') dst: string): Promise<R<void>> {
    await mv(src, dst)
    return R.success()
  }
}
