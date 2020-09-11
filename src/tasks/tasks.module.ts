import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskReposity } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ TaskReposity ]),
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
