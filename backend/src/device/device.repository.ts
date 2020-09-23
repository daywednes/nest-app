import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { GetDeviceFilterDto } from './dto/get-device.dto';
import { DeviceEntity } from './device.entity';

@EntityRepository(DeviceEntity)
export class DeviceRepository extends Repository<DeviceEntity> {
  private logger = new Logger('DeviceRepository');
  async getDevices(
    id: number,
  ): Promise<DeviceEntity[]> {
    
    const query = this.createQueryBuilder('device_entity');
    // query.where('device_entity.orgId = :orgId', { orgId: id });
    try {
      const devices = await query.getMany();
      return devices;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createDevice(createDeviceDto: CreateDeviceDto, org: OrgEntity): Promise<DeviceEntity> {
    const { name, description } = createDeviceDto;
    const device = new DeviceEntity();
    device.description = description;
    device.name = name;
    device.org = org;
    await device.save();
    delete device.org;
    return device;
  }
}
