import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //  @Get()
  //  getAllTasks(
  //    @Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto,
  //  ): Task[] {
  //    if (Object.keys(getTasksFilterDto).length) {
  //      return this.tasksService.getTasksFilter(getTasksFilterDto);
  //    }
  //    return this.tasksService.getAllTasks();
  //  }
  //
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  //
  //  @Post()
  //  @UsePipes(ValidationPipe)
  //  createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //    return this.tasksService.createTask(createTaskDto);
  //  }
  //
  //  @Delete('/:id')
  //  deleteTask(@Param('id') id: string) {
  //    return this.tasksService.deleteTask(id);
  //  }
  //
  //  @Patch('/:id/status')
  //  updateTask(
  //    @Param('id') id: string,
  //    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  //  ) {
  //    return this.tasksService.updateTask(id, status);
  //  }
}
