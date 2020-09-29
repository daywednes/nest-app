import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatTagsDto } from './dto/create-tags.dto';
import { GetTagsFilterDto } from './dto/get-tags.dto';
import { TagsEntity } from './tags.entity';
import { TagsDevicesEntity } from './tags_divice.entity';
import { DeviceEntity } from 'src/device/device.entity';

@EntityRepository(TagsDevicesEntity)
export class TagsDeivceRepository extends Repository<TagsDevicesEntity> {
  private logger = new Logger('TagsRepository');

  async createDeviceTags(tag: TagsEntity, device: DeviceEntity): Promise<TagsDevicesEntity> {
    const tagsDevice = new TagsDevicesEntity();
    tagsDevice.tag = tag;
    tagsDevice.device = device;
    await tagsDevice.save();
    return tagsDevice;
  }
}
