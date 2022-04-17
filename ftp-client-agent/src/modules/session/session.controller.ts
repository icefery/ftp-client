import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { SessionEntity } from './session.entity'
import { R } from '../../utils/dto'
import { SessionService } from './session.service'

@Controller('/session')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Get()
  async list(): Promise<R<SessionEntity[]>> {
    const data = await this.service.findAll()
    return R.success(data)
  }

  @Post()
  async create(entity: SessionEntity): Promise<R<void>> {
    await this.service.create(entity)
    return R.success(null)
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() entity: SessionEntity): Promise<R<void>> {
    await this.service.updateById(id, entity)
    return R.success(null)
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<R<void>> {
    await this.service.deleteById(id)
    return R.success(null)
  }
}