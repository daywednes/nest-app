import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { GetDeviceFilterDto } from './dto/get-device.dto';
import { DeviceEntity } from './device.entity';
import { DeviceRepository } from './device.repository';
import { OrgRepository } from '../org/org.repository';
import { ZoneRepository } from '../zone/zone.repository';
import { AddDeviceZoneDto } from './dto/add-device-to-zone.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceRepository)
    private deviceRepository: DeviceRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
  ) { }

  getdevices(orgId: number): Promise<DeviceEntity[]> {
    return this.deviceRepository.getDevices(orgId);
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
    const result = await this.deviceRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Device with id: ${id} not found`);
    }
  }

  async createdevice(createdeviceDto: CreateDeviceDto, user: User): Promise<DeviceEntity> {
    const org = await this.orgRepository.findOne({
      where: { id: createdeviceDto.orgId, userId: user.id },
    });
    return await this.deviceRepository.createDevice(createdeviceDto, org, user);
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

  async updatedevice(id: number, createdeviceDto: CreateDeviceDto): Promise<DeviceEntity> {
    const device = await this.getdeviceById(id);
    device.description = createdeviceDto.description;
    device.name = createdeviceDto.name;
    await device.save();
    return device;
  }
}
