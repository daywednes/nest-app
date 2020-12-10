import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { GetActivityFilterDto } from './dto/get-activity.dto';
import { ActivityEntity } from './activity.entity';
import { ActivityRepository } from './activity.repository';
import { HubsRepository } from '../hubs/hubs.repository';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityRepository)
    private activityRepository: ActivityRepository,
    @InjectRepository(HubsRepository)
    private hubsRepository: HubsRepository
  ) {}

  getActivity(activityFilterDto: GetActivityFilterDto, user: User): Promise<ActivityEntity[]> {
    return this.activityRepository.getActivity(activityFilterDto, user);
  }

  async getActivityById(id: number, user: User): Promise<ActivityEntity> {
    const found = await this.activityRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Available device with id: ${id} not found`);
    }
    return found;
  }
  

  async getActivityByhubId(hubId: string, user: User): Promise<ActivityEntity[]> {
    return this.activityRepository.getActivityByhubId(hubId, user);
    
  }

  async deleteActivity(id: number, user: User) {
    const result = await this.activityRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Available device  with id: ${id} not found`);
    }
    // await this.zoneRepository.delete({activityId: id })
  }

  async createActivity(createActivityDto: CreateActivityDto, user: User): Promise<ActivityEntity> {
    
    const hub = await this.hubsRepository.findOne({
      where: { id: createActivityDto.hubId },
    });
    return await this.activityRepository.createActivity(createActivityDto, hub);
  }

  async createActivityByTrigger(createActivityDto: Map<string,string>): Promise<ActivityEntity> {
    
    const hub = await this.hubsRepository.findOne({
      where: { id: createActivityDto["hubId"] },
    });

    let tmp = new CreateActivityDto();
    tmp.name = createActivityDto["name"];
    tmp.description = createActivityDto["description"];
    tmp.hubId = createActivityDto["hubId"];

    return await this.activityRepository.createActivity(tmp, hub);
  }

  async updateActivity(id: number,  user: User,  updateActivityDto: CreateActivityDto): Promise<ActivityEntity> {
    const activity = await this.getActivityById(id, user);
    const { name, description } = updateActivityDto;
    activity.name = name;
    activity.description = description;
    await activity.save();
    return activity;
  }
}
