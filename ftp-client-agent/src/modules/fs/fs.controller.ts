import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { IFileDTO } from './fs.dto'
import { R } from '../../utils/dto'

@Controller('/fs')
export class FSController {
  @Get('/ls')
  ls(@Query('src') src: string): R<any> {
    const data = fs.readdirSync(src).reduce<IFileDTO[]>((prev, curr) => {
      const filename = curr
      const filepath = path.join(src, filename)
      const stats = fs.statSync(filepath)
      const filesize = stats.size
      const filetype = stats.isDirectory() ? 'd' : stats.isFile() ? '-' : 'unknown'
      if (filetype !== 'unknown') {
        prev.push({ type: filetype, name: filename, path: filepath, size: filesize })
      }
      return prev
    }, [])
    return R.success(data)
  }

  @Post('/mkdir')
  mkdir(@Query('dst') dst: string): R<any> {
    fs.mkdirSync(dst, { recursive: true })
    return R.success(null)
  }

  @Delete('/rm')
  rm(@Query('dst') src: string): R<any> {
    fs.rmSync(src, { force: true, recursive: true })
    return R.success(null)
  }

  @Put('/mv')
  mv(@Query('src') src: string, @Query('dst') dst: string): R<any> {
    if (path.dirname(src) !== path.dirname(dst)) {
      fs.mkdirSync(path.dirname(dst), { recursive: true })
    }
    fs.renameSync(src, dst)
    return R.success(null)
  }
}