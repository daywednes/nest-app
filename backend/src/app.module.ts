import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { OrgModule } from './org/org.module';
import { ZoneModule } from './zone/zone.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    ZoneModule,
    OrgModule,
    AuthModule,
    DeviceModule
  ],
})
export class AppModule {}
