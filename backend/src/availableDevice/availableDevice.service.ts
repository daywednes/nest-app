import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateAvailableDevicesDto } from './dto/create-availableDevice.dto';
import { GetAvailableDevicesFilterDto } from './dto/get-availableDevice.dto';
import { AvailableDevicesEntity } from './availableDevice.entity';
import { AvailableDevicesRepository } from './availableDevice.repository';
import { ZoneRepository } from '../zone/zone.repository';

@Injectable()
export class AvailableDevicesService {
  constructor(
    @InjectRepository(AvailableDevicesRepository)
    private availableDevicesRepository: AvailableDevicesRepository,
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
  ) {}

  getAvailableDevices(availableDevicesFilterDto: GetAvailableDevicesFilterDto, user: User): Promise<AvailableDevicesEntity[]> {
    return this.availableDevicesRepository.getAvailableDevices(availableDevicesFilterDto, user);
  }

  async getAvailableDevicesById(id: number, user: User): Promise<AvailableDevicesEntity> {
    const found = await this.availableDevicesRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Available device with id: ${id} not found`);
    }
    return found;
  }

  async getAvailableDevicesByDeviceId(deviceId: number, user: User): Promise<AvailableDevicesEntity[]> {
    return this.availableDevicesRepository.getAvailableDevicesByDeviceId(deviceId, user);
    
  }

  async deleteAvailableDevices(id: number, user: User) {
    const result = await this.availableDevicesRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Available device  with id: ${id} not found`);
    }
    // await this.zoneRepository.delete({availableDevicesId: id })
  }

  async createAvailableDevices(createAvailableDevicesDto: CreateAvailableDevicesDto, user: User): Promise<AvailableDevicesEntity> {
    return await this.availableDevicesRepository.createAvailableDevices(createAvailableDevicesDto, user);
  }

  async updateAvailableDevices(id: number,  user: User,  updateAvailableDevicesDto: CreateAvailableDevicesDto): Promise<AvailableDevicesEntity> {
    const availableDevices = await this.getAvailableDevicesById(id, user);
    const { name,connectionStatus,description,deviceGroup,engineStatus,locationType,sensorType,tags } = updateAvailableDevicesDto;
    availableDevices.name = name;
    availableDevices.connectionStatus = connectionStatus;
    availableDevices.description = description;
    availableDevices.deviceGroup = deviceGroup;
    availableDevices.locationType = locationType;
    availableDevices.engineStatus = engineStatus;
    availableDevices.sensorType = sensorType;
    availableDevices.tags = tags;
    await availableDevices.save();
    return availableDevices;
  }
}
