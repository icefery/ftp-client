import { Context, Task } from './type'

export const context: Context = { tasks: [] }

export function updateTask(newTask: Task) {
  const oldTask = context.tasks.find(
    it =>
      it.type === newTask.type &&
      it.src.session.id === newTask.src.session.id &&
      it.src.path === newTask.src.path &&
      it.dst.session.id === newTask.dst.session.id &&
      it.dst.path === newTask.dst.path
  )
  if (oldTask) {
    oldTask.progress = newTask.progress
  } else {
    context.tasks.push(newTask)
  }
}
