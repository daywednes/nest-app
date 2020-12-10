import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { GetActivityFilterDto } from './dto/get-activity.dto';
import { ActivityEntity } from './activity.entity';
import { HubsEntity } from '../hubs/hubs.entity';

@EntityRepository(ActivityEntity)
export class ActivityRepository extends Repository<ActivityEntity> {
  private logger = new Logger('ActivityRepository');

  async getActivity(
    activityFilterDto: GetActivityFilterDto,
    user: User,
  ): Promise<ActivityEntity[]> {
    // const { hubId } = activityFilterDto;
    const query = this.createQueryBuilder('activity_entity');
    // query.where('activity_entity.userId = :userId', { userId: user.id });
    // if (name) {
    //   query.where(`activity_entity.hubId = :hubId`, { hubId });
    // }

    try {
      const activity = await query.getMany();
      return activity;
    } catch (err) {
      this.logger.error(
        `Failed to get Activity for user ${
          user.username
        } with dto ${JSON.stringify(activityFilterDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getActivityByhubId(
    hubId: string,
    user: User,
  ): Promise<ActivityEntity[]> {
    const query = this.createQueryBuilder('activity_entity');
    query.where('activity_entity.hubId = :hubId', { hubId: hubId });

    try {
      const activity = await query.getMany();
      return activity;
    } catch (err) {
      this.logger.error(
        `Failed to get Activity for device ${hubId}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createActivity(
    createActivityDto: CreateActivityDto,
    hub: HubsEntity,
  ): Promise<ActivityEntity> {
    const { name, description } = createActivityDto;
    const activity = new ActivityEntity();
    activity.name = name;
    activity.description = description;
    activity.hub = hub;
    await activity.save();
    return activity;
  }
}
