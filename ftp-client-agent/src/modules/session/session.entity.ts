import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('session')
export class SessionEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  type: string

  @Column({ type: 'text' })
  host: string

  @Column({ type: 'integer' })
  port: number

  @Column({ type: 'text' })
  user: string

  @Column({ type: 'text' })
  pass: string
}