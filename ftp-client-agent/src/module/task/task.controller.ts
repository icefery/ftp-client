import { Body, Controller, Delete, Get } from '@nestjs/common'
import { context, removeTask } from '../../context'
import R from '../../util/r'
import { Task } from '../../context/type'

@Controller('/task')
export class TaskController {
  @Get()
  async list(): Promise<R<Task[]>> {
    const data = context.tasks
    return R.success(data)
  }

  @Delete()
  async remove(@Body() ids: number[]): Promise<R<void>> {
    ids.forEach(id => removeTask(id))
    return R.success()
  }
}
