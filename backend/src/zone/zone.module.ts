import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ZoneRepository } from './zone.repository';
import { OrgRepository } from '../org/org.repository';
import { HubsRepository } from '../hubs/hubs.repository';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';

@Module({
  imports: [TypeOrmModule.forFeature([ZoneRepository]),TypeOrmModule.forFeature([OrgRepository]),TypeOrmModule.forFeature([HubsRepository]), AuthModule],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
