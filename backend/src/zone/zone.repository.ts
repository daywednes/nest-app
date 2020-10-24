import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrgEntity } from 'src/org/org.entity';
import { HubsEntity } from 'src/hubs/hubs.entity';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { ZoneEntity } from './zone.entity';

@EntityRepository(ZoneEntity)
export class ZoneRepository extends Repository<ZoneEntity> {
  private logger = new Logger('ZoneRepository');

  
  async getZones(
    id: number,
  ): Promise<ZoneEntity[]> {
    
    const query = this.createQueryBuilder('zone_entity')
    .leftJoinAndSelect('zone_entity.devices', 'devices');
    query.where('zone_entity.orgId = :orgId', { orgId: id });
    try {
      const zones = await query.getMany();
      return zones;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getZonesHub(
    hubId: number,
  ): Promise<ZoneEntity[]> {
    
    const query = this.createQueryBuilder('zone_entity')
    .leftJoinAndSelect('zone_entity.devices', 'devices');
    query.where('zone_entity.hubId = :hubId', { hubId: hubId });
    try {
      const zones = await query.getMany();
      return zones;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createZone(createZoneDto: CreateZoneDto, org: OrgEntity, hub: HubsEntity): Promise<ZoneEntity> {
    const { name, description } = createZoneDto;
    const zone = new ZoneEntity();
    zone.description = description;
    zone.name = name;
    zone.org = org;
    zone.hub = hub;
    await zone.save();
    delete zone.org;
    delete zone.hub;
    return zone;
  }
}
