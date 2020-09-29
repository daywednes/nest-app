import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DeviceRepository } from './device.repository';
import { OrgRepository } from '../org/org.repository';
import { ZoneRepository } from '../zone/zone.repository';
import { TagsRepository } from '../tags/tags.repository';
import { TagsDeivceRepository } from '../tags/tagsdeivces.repository';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceRepository]),
    TypeOrmModule.forFeature([OrgRepository]),
    TypeOrmModule.forFeature([TagsRepository]),
    TypeOrmModule.forFeature([TagsDeivceRepository]),
    TypeOrmModule.forFeature([ZoneRepository]), AuthModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule { }
