import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { ZoneEntity } from './zone.entity';
import { ZoneRepository } from './zone.repository';
import { OrgRepository } from '../org/org.repository';
import { HubsRepository } from '../hubs/hubs.repository';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
    @InjectRepository(HubsRepository)
    private hubsRepository: HubsRepository,
  ) { }

  getzones(orgId: number): Promise<ZoneEntity[]> {
    return this.zoneRepository.getZones(orgId);
  }

  getzonesHub(hubId: number): Promise<ZoneEntity[]> {
    return this.zoneRepository.getZonesHub(hubId);
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
      where: { id: createzoneDto.orgId},
    });
    const hub = await this.hubsRepository.findOne({
      where: { id: createzoneDto.hubId },
    });
    return await this.zoneRepository.createZone(createzoneDto, org, hub);
  }

  async updatezone(id: number, createzoneDto: CreateZoneDto): Promise<ZoneEntity> {
    const zone = await this.getzoneById(id);
    zone.description = createzoneDto.description;
    zone.name = createzoneDto.name;
    await zone.save();
    return zone;
  }
}
