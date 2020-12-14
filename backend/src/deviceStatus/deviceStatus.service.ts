import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateDeviceStatusDto } from './dto/create-deviceStatus.dto';
import { GetDeviceStatusFilterDto } from './dto/get-deviceStatus.dto';
import { DeviceStatusEntity } from './deviceStatus.entity';
import { DeviceStatusRepository } from './deviceStatus.repository';
import { HubsRepository } from '../hubs/hubs.repository';

@Injectable()
export class DeviceStatusService {
  constructor(
    @InjectRepository(DeviceStatusRepository)
    private deviceStatusRepository: DeviceStatusRepository,
    @InjectRepository(HubsRepository)
    private hubsRepository: HubsRepository
  ) {}

  getDeviceStatus(deviceStatusFilterDto: GetDeviceStatusFilterDto, user: User): Promise<DeviceStatusEntity[]> {
    return this.deviceStatusRepository.getDeviceStatus(deviceStatusFilterDto, user);
  }

  async getDeviceStatusById(id: number, user: User): Promise<DeviceStatusEntity> {
    const found = await this.deviceStatusRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Available device with id: ${id} not found`);
    }
    return found;
  }
  

  async getDeviceStatusByhubId(hubId: string, user: User): Promise<DeviceStatusEntity[]> {
    return this.deviceStatusRepository.getDeviceStatusByhubId(hubId, user);
    
  }

  async deleteDeviceStatus(id: number, user: User) {
    const result = await this.deviceStatusRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Available device  with id: ${id} not found`);
    }
    // await this.zoneRepository.delete({deviceStatusId: id })
  }

  async createDeviceStatus(createDeviceStatusDto: CreateDeviceStatusDto, user: User): Promise<DeviceStatusEntity> {
    
    const hub = await this.hubsRepository.findOne({
      where: { id: createDeviceStatusDto.hubId },
    });
    return await this.deviceStatusRepository.createDeviceStatus(createDeviceStatusDto, hub);
  }

  async createDeviceStatusByTrigger(createDeviceStatusDto: Map<string,string>): Promise<DeviceStatusEntity> {
    
    const hub = await this.hubsRepository.findOne({
      where: { id: createDeviceStatusDto["hubId"] },
    });

    let tmp = new CreateDeviceStatusDto();
    tmp.name = createDeviceStatusDto["name"];
    tmp.status = createDeviceStatusDto["description"];
    tmp.hubId = createDeviceStatusDto["hubId"];

    return await this.deviceStatusRepository.createDeviceStatus(tmp, hub);
  }

  async updateDeviceStatus(id: number,  user: User,  updateDeviceStatusDto: CreateDeviceStatusDto): Promise<DeviceStatusEntity> {
    const deviceStatus = await this.getDeviceStatusById(id, user);
    const { name, status,message,sensorType,locationType,deviceGroup } = updateDeviceStatusDto;
    deviceStatus.name = name;
    deviceStatus.message = message;
    deviceStatus.sensorType = sensorType;
    deviceStatus.sensorType = sensorType;
    deviceStatus.locationType = locationType;
    deviceStatus.deviceGroup = deviceGroup;
    await deviceStatus.save();
    return deviceStatus;
  }
}
