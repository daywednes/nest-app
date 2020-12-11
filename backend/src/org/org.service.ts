import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ZoneRepository } from '../zone/zone.repository';
import { AutomationsRepository } from '../automations/automations.repository';
import { CreateOrganizationDto } from './dto/create-org.dto';
import { GetOrgFilterDto } from './dto/get-org.dto';
import { OrgEntity } from './org.entity';
import { OrgRepository } from './org.repository';
import { CreateAutomationsDto } from 'src/automations/dto/create-automations.dto';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
    @InjectRepository(AutomationsRepository)
    private automationsRepository: AutomationsRepository,
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
  ) {}

  getOrg(orgFilterDto: GetOrgFilterDto, user: User): Promise<OrgEntity[]> {
    return this.orgRepository.getOrg(orgFilterDto, user);
  }

  async getOrgById(id: number, user: User): Promise<OrgEntity> {
    const found = await this.orgRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Oranization with id: ${id} not found`);
    }
    return found;
  }

  async deleteOrg(id: number, user: User) {
    const result = await this.orgRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Oranization with id: ${id} not found`);
    }
    await this.zoneRepository.delete({ orgId: id });
  }

  async createOrg(
    createOrgDto: CreateOrganizationDto,
    user: User,
  ): Promise<OrgEntity> {
    const found = await this.orgRepository.findOne({
      where: {name: createOrgDto.name },
    });
    if (found) {
      throw new NotFoundException(`Oranization with name: ${createOrgDto.name} is exist`);
    }
    var createautomationsDto = new CreateAutomationsDto();
    var createautomationsDto1 = new CreateAutomationsDto();
    var createautomationsDto2 = new CreateAutomationsDto();
    createautomationsDto.name ="spleep"
    createautomationsDto1.name ="away"
    createautomationsDto2.name ="stay"
    createautomationsDto.description ="spleep"
    createautomationsDto1.description ="away"
    createautomationsDto2.description ="stay"
    createautomationsDto.status ="spleep"
    createautomationsDto1.status ="away"
    createautomationsDto2.status ="stay"
    createautomationsDto.type =1
    createautomationsDto1.type =1
    createautomationsDto2.type =1
    const org =  await this.orgRepository.createOrg(createOrgDto, user)
    this.automationsRepository.createAutomations(createautomationsDto, org);
    this.automationsRepository.createAutomations(createautomationsDto1, org);
    this.automationsRepository.createAutomations(createautomationsDto2, org);
    return org;
  }

  async updateOrg(
    id: number,
    user: User,
    description: string,
  ): Promise<OrgEntity> {
    const org = await this.getOrgById(id, user);
    org.description = description;
    await org.save();
    return org;
  }
}
