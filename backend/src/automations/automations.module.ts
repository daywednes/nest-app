import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AutomationsRepository } from './automations.repository';
import { OrgRepository } from '../org/org.repository';
import { AutomationsController } from './automations.controller';
import { AutomationsService } from './automations.service';

@Module({
  imports: [TypeOrmModule.forFeature([AutomationsRepository]),TypeOrmModule.forFeature([OrgRepository]), AuthModule],
  controllers: [AutomationsController],
  providers: [AutomationsService],
})
export class AutomationsModule {}
