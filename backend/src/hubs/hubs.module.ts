import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HubsRepository } from './hubs.repository';
import { OrgRepository } from '../org/org.repository';
import { HubsController } from './hubs.controller';
import { HubsService } from './hubs.service';

@Module({
  imports: [TypeOrmModule.forFeature([HubsRepository]),TypeOrmModule.forFeature([OrgRepository]), AuthModule],
  controllers: [HubsController],
  providers: [HubsService],
})
export class HubsModule {}
