import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  //  getAllTasks(): Task[] {
  //    return this.tasks;
  //  }
  //
  //  getTasksFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
  //    const { status, search } = getTasksFilterDto;
  //    let tasks = this.tasks;
  //    if (status) {
  //      tasks = tasks.filter(task => task.status === status);
  //    }
  //    if (search) {
  //      tasks = tasks.filter(
  //        task =>
  //          task.description.includes(search) || task.title.includes(search),
  //      );
  //    }
  //    return tasks;
  //  }
  //
  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return found;
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.create(createTaskDto);
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    task.status = status;
    await task.save();
    return task;
  }
}
