import { InternalServerErrorException, Logger } from '@nestjs/common';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { GetDeviceFilterDto } from './dto/get-device.dto';
import { AddDeviceZoneDto } from './dto/add-device-to-zone.dto';
import { DeviceEntity } from './device.entity';

@EntityRepository(DeviceEntity)
export class DeviceRepository extends Repository<DeviceEntity> {
  private logger = new Logger('DeviceRepository');
  async getDevices(
    id: number,
  ): Promise<DeviceEntity[]> {
    const query = this.createQueryBuilder('device')
    .leftJoinAndSelect('device.org', 'org')
    .leftJoinAndSelect('device.user', 'user')
    .leftJoinAndSelect('device.zone', 'zone')
    .leftJoinAndSelect('device.tagsdevice', 'tagsdevice')
    // .leftJoinAndSelect('device.tagsdevice.tag', 'tags');
     query.where('device.org.id = :orgId', { orgId: id });
    try {
      const devices = await query.getMany();
      return devices;
    } catch (err) {
      console.log('err'+err)
      throw new InternalServerErrorException();
    }
  }
  async getDevicesAvail(
    id: number,
  ): Promise<DeviceEntity[]> {
    const query = this.createQueryBuilder('device')
    .leftJoinAndSelect('device.org', 'org')
    .leftJoinAndSelect('device.user', 'user')
    .leftJoinAndSelect('device.zone', 'zone');
     query.where('device.org.id = :orgId', { orgId: id });
     query.andWhere('device.zone = :zone', { zone: null });
    try {
      const devices = await query.getMany();
      return devices;
    } catch (err) {
      console.log('err'+err)
      throw new InternalServerErrorException();
    }
  }
  
  async getdevicesbyzone(
    id: number,
  ): Promise<DeviceEntity[]> {
    const query = this.createQueryBuilder('device')
    .leftJoinAndSelect('device.zone', 'zone');
     query.where('device.zone.id = :zoneId', { zoneId: id });
    try {
      const devices = await query.getMany();
      return devices;
    } catch (err) {
      console.log('err'+err)
      throw new InternalServerErrorException();
    }
  }

  async createDevice(createDeviceDto: CreateDeviceDto, org: OrgEntity, user: User): Promise<DeviceEntity> {
    const { name, description } = createDeviceDto;
    const device = new DeviceEntity();
    device.description = description;
    device.name = name;
    device.org = org;
    device.user = user ;

    await device.save();
    delete device.org;
    return device;
  }
}
