import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { ZoneEntity } from './zone.entity';

@EntityRepository(ZoneEntity)
export class ZoneRepository extends Repository<ZoneEntity> {
  private logger = new Logger('ZoneRepository');
  async getZones(
    user: User,
  ): Promise<ZoneEntity[]> {
    
    const query = this.createQueryBuilder('zone_entity');
    try {
      const zones = await query.getMany();
      return zones;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createZone(createZoneDto: CreateZoneDto, org: OrgEntity): Promise<ZoneEntity> {
    const { name, description } = createZoneDto;
    const zone = new ZoneEntity();
    zone.description = description;
    zone.name = name;
    zone.org = org;
    await zone.save();
    delete zone.org;
    return zone;
  }
}
