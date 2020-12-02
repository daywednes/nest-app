import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { OrgModule } from './org/org.module';
import { ZoneModule } from './zone/zone.module';
import { HubsModule } from './hubs/hubs.module';
import { AutomationsModule } from './automations/automations.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { TagsModule } from './tags/tags.module';
import { AvailableDevicesModule } from './availableDevice/availableDevice.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    ZoneModule,
    HubsModule,
    AutomationsModule,
    OrgModule,
    AuthModule,
    TagsModule,
    AvailableDevicesModule,
    DeviceModule
  ],
  exports:[AvailableDevicesModule]
})
export class AppModule {}
