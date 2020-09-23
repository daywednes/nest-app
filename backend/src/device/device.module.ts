import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DeviceRepository } from './device.repository';
import { OrgRepository } from '../org/org.repository';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceRepository]),TypeOrmModule.forFeature([OrgRepository]), AuthModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
