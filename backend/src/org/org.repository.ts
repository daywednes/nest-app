import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-org.dto';
import { GetOrgFilterDto } from './dto/get-org.dto';
import { OrgEntity } from './org.entity';

@EntityRepository(OrgEntity)
export class OrgRepository extends Repository<OrgEntity> {
  private logger = new Logger('OrgRepository');
  async getOrg(
    orgFilterDto: GetOrgFilterDto,
    user: User,
  ): Promise<OrgEntity[]> {
    const { name, description } = orgFilterDto;
    const query = this.createQueryBuilder('org_entity');
    query.where('org_entity.userId = :userId', { userId: user.id });
    if (name) {
      query.andWhere(`org_entity.name = :name`, { name });
    }
    if (description) {
      query.andWhere(
        `org_entity.title LIKE :search or org_entity.description LIKE :search`,
        { search: `%${description}%` },
      );
    }
    try {
      const org = await query.getMany();
      return org;
    } catch (err) {
      this.logger.error(
        `Failed to get Org for user ${user.username} with dto ${JSON.stringify(
          orgFilterDto,
        )}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createOrg(
    createOrgDto: CreateOrganizationDto,
    user: User,
  ): Promise<OrgEntity> {
    const { name, description } = createOrgDto;
    const org = new OrgEntity();
    org.description = description;
    org.name = name;
    org.user = user;
    await org.save();
    delete org.user;
    return org;
  }
}
