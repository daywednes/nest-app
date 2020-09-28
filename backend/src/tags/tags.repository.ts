import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatTagsDto } from './dto/create-tags.dto';
import { GetTagsFilterDto } from './dto/get-tags.dto';
import { TagsEntity } from './tags.entity';
import { TagsDevicesEntity } from './tags_divice.entity';
import { DeviceEntity } from 'src/device/device.entity';

@EntityRepository(TagsEntity)
export class TagsRepository extends Repository<TagsEntity> {
  private logger = new Logger('TagsRepository');
  async getTags(
    tagsFilterDto: GetTagsFilterDto,
    user: User,
  ): Promise<TagsEntity[]> {
    const { name } = tagsFilterDto;
    const query = this.createQueryBuilder('tags_entity');
    query.where('tags_entity.userId = :userId', { userId: user.id });
    if (name) {
      query.andWhere(`tags_entity.name = :name`, { name });
    }
    
    try {
      const tags = await query.getMany();
      return tags;
    } catch (err) {
      this.logger.error(
        `Failed to get Tags for user ${
          user.username
        } with dto ${JSON.stringify(tagsFilterDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTags(createTagsDto: CreatTagsDto, user: User): Promise<TagsEntity> {
    const { name } = createTagsDto;
    const tags = new TagsEntity();
    tags.name = name;
    tags.userId = user.id;
    await tags.save();
    return tags;
  }

  async createDeviceTags(tag: TagsEntity,  device: DeviceEntity): Promise<TagsDevicesEntity> {
    const tagsDevice = new TagsDevicesEntity();
    tagsDevice.tag = tag;
    tagsDevice.device = device;
    await tagsDevice.save();
    return tagsDevice;
  }
}
