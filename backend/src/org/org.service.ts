import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ZoneRepository } from '../zone/zone.repository';
import { CreateOrganizationDto } from './dto/create-org.dto';
import { GetOrgFilterDto } from './dto/get-org.dto';
import { OrgEntity } from './org.entity';
import { OrgRepository } from './org.repository';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
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
    return await this.orgRepository.createOrg(createOrgDto, user);
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
