import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Session } from './session.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import R from '../../utils/r'

@Controller('/session')
export class SessionController {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>
  ) {}

  @Get()
  async list(): Promise<R<Session[]>> {
    const data = await this.repository.find()
    return R.success(data)
  }

  @Post()
  async create(entity: Session): Promise<R<void>> {
    await this.repository.insert(entity)
    return R.success(null)
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() entity: Session): Promise<R<void>> {
    await this.repository.update({ id }, entity)
    return R.success(null)
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<R<void>> {
    await this.repository.delete({ id })
    return R.success(null)
  }
}
