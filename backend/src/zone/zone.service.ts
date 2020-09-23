import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { ZoneEntity } from './zone.entity';
import { ZoneRepository } from './zone.repository';
import { OrgRepository } from '../org/org.repository';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
  ) { }

  getzones(orgId: number): Promise<ZoneEntity[]> {
    return this.zoneRepository.getZones(orgId);
  }

  async getzoneById(id: number): Promise<ZoneEntity> {
    const found = await this.zoneRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(` ${id} not found`);
    }
    return found;
  }

  async deletezone(id: number) {
    const result = await this.zoneRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Zone with id: ${id} not found`);
    }
  }

  async createzone(createzoneDto: CreateZoneDto, user: User): Promise<ZoneEntity> {
    const org = await this.orgRepository.findOne({
      where: { id: createzoneDto.orgId, userId: user.id },
    });
    return await this.zoneRepository.createZone(createzoneDto, org);
  }

  async updatezone(id: number, createzoneDto: CreateZoneDto): Promise<ZoneEntity> {
    const zone = await this.getzoneById(id);
    zone.description = createzoneDto.description;
    zone.name = createzoneDto.name;
    await zone.save();
    return zone;
  }
}
