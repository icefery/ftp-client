import { Body, Controller, Post } from '@nestjs/common'
import * as path from 'path'
import R from '../../util/r'

@Controller('/os')
export class OSController {
  @Post('/resolve')
  async resolve(@Body() pathSegments: string[]) {
    const data = path.resolve(...pathSegments)
    return R.success(data)
  }
}
