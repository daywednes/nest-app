import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrgRepository } from './org.repository';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrgRepository]), AuthModule],
  controllers: [OrgController],
  providers: [OrgService],
})
export class OrgModule {}
