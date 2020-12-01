import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AvailableDevicesRepository } from './availableDevice.repository';
import { AvailableDevicesController } from './availableDevice.controller';
import { AvailableDevicesService } from './availableDevice.service';
import { ZoneRepository } from '../zone/zone.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AvailableDevicesRepository]),TypeOrmModule.forFeature([ZoneRepository]), AuthModule],
  controllers: [AvailableDevicesController],
  providers: [AvailableDevicesService],
})
export class AvailableDevicesModule {}
