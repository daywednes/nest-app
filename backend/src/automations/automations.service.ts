import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateAutomationsDto } from './dto/create-automations.dto';
import { GetAutomationsFilterDto } from './dto/get-automations.dto';
import { AutomationsEntity } from './automations.entity';
import { AutomationsRepository } from './automations.repository';
import { OrgRepository } from '../org/org.repository';

@Injectable()
export class AutomationsService {
  constructor(
    @InjectRepository(AutomationsRepository)
    private automationsRepository: AutomationsRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
  ) { }

  getautomationss(orgId: number): Promise<AutomationsEntity[]> {
    return this.automationsRepository.getAutomationss(orgId);
  }

  async getautomationsById(id: number): Promise<AutomationsEntity> {
    const found = await this.automationsRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(` ${id} not found`);
    }
    return found;
  }

  async deleteautomations(id: number) {
    const result = await this.automationsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Automations with id: ${id} not found`);
    }
  }

  async createautomations(createautomationsDto: CreateAutomationsDto, user: User): Promise<AutomationsEntity> {
    const org = await this.orgRepository.findOne({
      where: { id: createautomationsDto.orgId, userId: user.id },
    });
    return await this.automationsRepository.createAutomations(createautomationsDto, org);
  }

  async updateautomations(id: number, createautomationsDto: CreateAutomationsDto): Promise<AutomationsEntity> {
    const automations = await this.getautomationsById(id);
    automations.data = createautomationsDto.data;
    automations.status = createautomationsDto.status;
    await automations.save();
    return automations;
  }
}
