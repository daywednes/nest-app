import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DeviceStatusRepository } from './deviceStatus.repository';
import { DeviceStatusController } from './deviceStatus.controller';
import { DeviceStatusService } from './deviceStatus.service';
import { ZoneRepository } from '../zone/zone.repository';
import { HubsRepository } from '../hubs/hubs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceStatusRepository]),TypeOrmModule.forFeature([ZoneRepository,HubsRepository]), AuthModule],
  controllers: [DeviceStatusController],
  providers: [DeviceStatusService],
})
export class DeviceStatusModule {}
