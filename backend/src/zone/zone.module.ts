import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ZoneRepository } from './zone.repository';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';

@Module({
  imports: [TypeOrmModule.forFeature([ZoneRepository]), AuthModule],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}
