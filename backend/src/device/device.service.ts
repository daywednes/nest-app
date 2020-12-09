import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { GetDeviceFilterDto } from './dto/get-device.dto';
import { DeviceEntity } from './device.entity';
import { DeviceRepository } from './device.repository';
import { OrgRepository } from '../org/org.repository';
import { ZoneRepository } from '../zone/zone.repository';
import { TagsRepository } from '../tags/tags.repository';
import { TagsDeivceRepository } from '../tags/tagsdeivces.repository';
import { AddDeviceZoneDto } from './dto/add-device-to-zone.dto';
import { async } from 'rxjs';
import { CreatTagsDto } from 'src/tags/dto/create-tags.dto';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TagsEntity } from 'src/tags/tags.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceRepository)
    private deviceRepository: DeviceRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
    @InjectRepository(TagsDeivceRepository)
    private tagsDeivceRepository: TagsDeivceRepository,
  ) {}

  async getdevices(orgId: number, user: User): Promise<DeviceEntity[]> {
    var devices = await this.deviceRepository.getDevices(orgId);
    if (devices && devices.length > 0) {
      for (const device of devices) {
        let tagsName = await this.tagsRepository.getTagsByDeviceId(
          device.id,
          user,
        );
        device.tags = tagsName.map(x => x.name);
      }
    }
    return devices;
  }
  getDevicesAvail(orgId: number): Promise<DeviceEntity[]> {
    return this.deviceRepository.getDevicesAvail(orgId);
  }

  getdevicesbyzone(zoneId: number): Promise<DeviceEntity[]> {
    return this.deviceRepository.getdevicesbyzone(zoneId);
  }

  async getdeviceById(id: number): Promise<DeviceEntity> {
    const found = await this.deviceRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(` ${id} not found`);
    }
    return found;
  }

  async deletedevice(id: number) {
    const device = await this.deviceRepository.findOne(id);
    this.tagsDeivceRepository.delete({
      device,
    });
    const result = await this.deviceRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Device with id: ${id} not found`);
    }
  }

  async createdevice(
    createdeviceDto: CreateDeviceDto,
    user: User,
  ): Promise<DeviceEntity> {
    const org = await this.orgRepository.findOne({
      where: { id: createdeviceDto.orgId},
    });
    const zone = await this.zoneRepository.findOne({
      where: { id: createdeviceDto.zoneId },
    });

    var newTagsList = [];
    if (
      createdeviceDto.tagsName != null &&
      createdeviceDto.tagsName.length > 0
    ) {
      newTagsList = await this.updateTagsList(createdeviceDto.tagsName, user);
    }

    var device = await this.deviceRepository.createDevice(
      createdeviceDto,
      org,
      zone,
      user,
    );

    if (newTagsList != null && newTagsList.length > 0) {
      this.createDeviceTags(newTagsList, device);
    }

    return device;
  }

  async addToZone(dto: AddDeviceZoneDto): Promise<DeviceEntity> {
    const device = await this.getdeviceById(dto.deviceId);
    const zone = await this.zoneRepository.findOne({
      where: { id: dto.zoneId },
    });
    device.zone = zone;
    await device.save();
    return device;
  }

  async removeFromZone(dto: AddDeviceZoneDto): Promise<DeviceEntity> {
    const device = await this.getdeviceById(dto.deviceId);
    device.zone = null;
    await device.save();
    return device;
  }

  async updateTagsList(tagsName: [string], user: User): Promise<TagsEntity[]> {
    const tags = await this.tagsRepository.find({
      where: { userId: user.id },
    });

    var newTagsList = [];

    if (tagsName != null && tagsName.length > 0) {
      for (const tagName of tagsName) {
        if (tags.map(x => x.name).includes(tagName)) {
          let tmpTag = tags.find(x => x.name == tagName);
          newTagsList.push(tmpTag);
        } else {
          let newTag = new CreatTagsDto();
          newTag.name = tagName;
          let tmpTag = await this.tagsRepository.createTags(newTag, user);
          newTagsList.push(tmpTag);
        }
      }
    }
    return newTagsList;
  }

  async createDeviceTags(newTagsList: TagsEntity[], device: DeviceEntity) {
    newTagsList.forEach(async tag => {
      await this.tagsDeivceRepository.createDeviceTags(tag, device);
    });
  }

  async updatedevice(
    id: number,
    dto: UpdateDeviceDto,
    user: User,
  ): Promise<DeviceEntity> {
    const zone = await this.zoneRepository.findOne({
      where: { id: dto.zoneId },
    });
    const org = await this.orgRepository.findOne({
      where: { id: dto.orgId },
    });

    //Update Tags
    var newTagsList = [];

    if (dto.tags != null && dto.tags.length > 0) {
      newTagsList = await this.updateTagsList(dto.tags, user);
    }

    const device = await this.getdeviceById(id);
    var result = await this.tagsDeivceRepository.delete({
      device,
    });
    if (newTagsList != null && newTagsList.length > 0) {
      await this.createDeviceTags(newTagsList, device);
    }

    //Update orther prop
    device.description = dto.description ? dto.description : device.description;
    device.location = dto.location ? dto.location : device.location;
    device.locationType = dto.locationType ? dto.locationType : device.locationType;
    device.name = dto.name ? dto.name : device.name;
    device.zone = zone;
    device.org = org ? org : device.org;
    device.index = dto.index ? dto.index : device.index;
    device.deviceGroup = dto.deviceGroup ? dto.deviceGroup : device.deviceGroup;
    device.sensorType = dto.sensorType ? dto.sensorType : device.sensorType;
    device.isDefine = dto.isDefine != null ? dto.isDefine : device.isDefine;
    await device.save();

    return device;
  }
}
