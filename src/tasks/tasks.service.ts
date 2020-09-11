import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {


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
//  getTaskById(id: string): Task {
//    const found = this.tasks.find(task => task.id === id);
//    if (!found) {
//      throw new NotFoundException(`Task with id: ${id} not found`);
//    }
//    return found;
//  }
//
//  deleteTask(id: string): void {
//    const found = this.getTaskById(id);
//    this.tasks = this.tasks.filter(task => task.id !== found.id);
//  }
//
//  createTask(createTaskDto: CreateTaskDto): Task {
//    const { title, description } = createTaskDto;
//    const task: Task = {
//      id: uuid.v1(),
//      title,
//      description,
//      status: TaskStatus.OPEN,
//    };
//    this.tasks.push(task);
//    return task;
//  }
//
//  updateTask(id: string, status: TaskStatus) {
//    const task = this.getTaskById(id);
//    task.status = status;
//  }
}
