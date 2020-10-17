import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateHubsDto } from './dto/create-hubs.dto';
import { GetHubsFilterDto } from './dto/get-hubs.dto';
import { HubsEntity } from './hubs.entity';

@EntityRepository(HubsEntity)
export class HubsRepository extends Repository<HubsEntity> {
  private logger = new Logger('HubsRepository');
  async getHubss(
    id: number,
  ): Promise<HubsEntity[]> {
    
    const query = this.createQueryBuilder('hubs_entity');
    query.where('hubs_entity.orgId = :orgId', { orgId: id });
    try {
      const hubss = await query.getMany();
      return hubss;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createHubs(createHubsDto: CreateHubsDto, org: OrgEntity): Promise<HubsEntity> {
    const { name, description } = createHubsDto;
    const hubs = new HubsEntity();
    hubs.description = description;
    hubs.name = name;
    hubs.org = org;
    await hubs.save();
    delete hubs.org;
    return hubs;
  }
}
