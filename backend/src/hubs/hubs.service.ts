import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateHubsDto } from './dto/create-hubs.dto';
import { GetHubsFilterDto } from './dto/get-hubs.dto';
import { HubsEntity } from './hubs.entity';
import { HubsRepository } from './hubs.repository';
import { OrgRepository } from '../org/org.repository';

@Injectable()
export class HubsService {
  constructor(
    @InjectRepository(HubsRepository)
    private hubsRepository: HubsRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
  ) { }

  gethubss(orgId: number): Promise<HubsEntity[]> {
    return this.hubsRepository.getHubss(orgId);
  }

  async gethubsById(id: number): Promise<HubsEntity> {
    const found = await this.hubsRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(` ${id} not found`);
    }
    return found;
  }

  async deletehubs(id: number) {
    const result = await this.hubsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Hubs with id: ${id} not found`);
    }
  }

  async createhubs(createhubsDto: CreateHubsDto, user: User): Promise<HubsEntity> {
    const org = await this.orgRepository.findOne({
      where: { id: createhubsDto.orgId, userId: user.id },
    });
    return await this.hubsRepository.createHubs(createhubsDto, org);
  }

  async updatehubs(id: number, createhubsDto: CreateHubsDto): Promise<HubsEntity> {
    const hubs = await this.gethubsById(id);
    hubs.description = createhubsDto.description;
    hubs.name = createhubsDto.name;
    await hubs.save();
    return hubs;
  }
}
