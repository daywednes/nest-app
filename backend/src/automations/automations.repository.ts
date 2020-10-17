import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAutomationsDto } from './dto/create-automations.dto';
import { GetAutomationsFilterDto } from './dto/get-automations.dto';
import { AutomationsEntity } from './automations.entity';

@EntityRepository(AutomationsEntity)
export class AutomationsRepository extends Repository<AutomationsEntity> {
  private logger = new Logger('AutomationsRepository');
  async getAutomationss(
    id: number,
  ): Promise<AutomationsEntity[]> {
    
    const query = this.createQueryBuilder('automations_entity');
    query.where('automations_entity.orgId = :orgId', { orgId: id });
    try {
      const automationss = await query.getMany();
      return automationss;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createAutomations(createAutomationsDto: CreateAutomationsDto, org: OrgEntity): Promise<AutomationsEntity> {
    const { status, data } = createAutomationsDto;
    const automations = new AutomationsEntity();
    automations.data = data;
    automations.status = status;
    automations.org = org;
    await automations.save();
    delete automations.org;
    return automations;
  }
}
