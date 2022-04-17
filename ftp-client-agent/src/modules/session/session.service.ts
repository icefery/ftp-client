import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SessionEntity } from './session.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>
  ) {
  }

  async create(entity: SessionEntity) {
    await this.repository.insert(entity)
    return true
  }

  async findAll() {
    return await this.repository.find()
  }

  async findById(id: number) {
    return await this.repository.findOne(id)
  }

  async updateById(id: number, entity: SessionEntity) {
    await this.repository.update(id, entity)
    return true
  }

  async deleteById(id: number) {
    await this.repository.delete(id)
    return true
  }
}