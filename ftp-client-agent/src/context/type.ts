import { Session } from '../module/session/session.entity'

export interface Task {
  id: number
  time: string
  type: 'upload' | 'download'
  src: {
    session: Session
    path: string
  }
  dst: {
    session: Session
    path: string
  }
  progress: {
    total: number
    current: number
  }
}

export interface Context {
  tasks: Task[]
}
