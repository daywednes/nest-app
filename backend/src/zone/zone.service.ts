import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { ZoneEntity } from './zone.entity';
import { ZoneRepository } from './zone.repository';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
  ) {}

  getzones( user: User): Promise<ZoneEntity[]> {
    return this.zoneRepository.getZones(user);
  }

  async getzoneById(id: number, org: OrgEntity): Promise<ZoneEntity> {
    const found = await this.zoneRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(` ${id} not found`);
    }
    return found;
  }

  async deletezone(id: number, org: OrgEntity) {
    const result = await this.zoneRepository.delete({ id, orgId: org.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Oranization with id: ${id} not found`);
    }
  }

  async createzone(createzoneDto: CreateZoneDto, org: OrgEntity): Promise<ZoneEntity> {
    return await this.zoneRepository.createZone(createzoneDto, org);
  }

  async updatezone(id: number,  description: string): Promise<ZoneEntity> {
    const zone = await this.getzoneById(id, null);
    zone.description = description;
    await zone.save();
    return zone;
  }
}
