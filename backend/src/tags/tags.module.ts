import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TagsRepository } from './tags.repository';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { ZoneRepository } from '../zone/zone.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagsRepository]),TypeOrmModule.forFeature([ZoneRepository]), AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
