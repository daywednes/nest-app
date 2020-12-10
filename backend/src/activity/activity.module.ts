import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityRepository } from './activity.repository';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ZoneRepository } from '../zone/zone.repository';
import { HubsRepository } from '../hubs/hubs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityRepository]),TypeOrmModule.forFeature([ZoneRepository,HubsRepository]), AuthModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
