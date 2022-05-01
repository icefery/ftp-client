import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Session {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id?: number

  @Column({ type: 'text' })
  name?: string

  @Column({ type: 'text' })
  type?: string

  @Column({ type: 'text' })
  host?: string

  @Column({ type: 'integer' })
  port?: number

  @Column({ type: 'text' })
  user?: string

  @Column({ type: 'text' })
  pass?: string

  @Column({ type: 'text' })
  init?: string
}
