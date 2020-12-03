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
    private availableDevicesRepository: AvailableDevicesRepository
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
  

  async getAvailableDevicesByDeviceId(deviceId: string, user: User): Promise<AvailableDevicesEntity> {
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
    const { deviceName,connectionStatus,deviceId,deviceGroup,engineStatus,locationType,sensorType,tags, msg } = updateAvailableDevicesDto;
    availableDevices.deviceName = deviceName;
    availableDevices.deviceId = deviceId;
    availableDevices.connectionStatus = connectionStatus;
    availableDevices.msg = msg;
    availableDevices.deviceGroup = deviceGroup;
    availableDevices.locationType = locationType;
    availableDevices.engineStatus = engineStatus;
    availableDevices.sensorType = sensorType;
    availableDevices.tags = tags;
    await availableDevices.save();
    return availableDevices;
  }

  async scanAvailableDevices(updateAvailableDevicesDto: Map<string,string>): Promise<AvailableDevicesEntity> {
    // const { deviceName,connectionStatus,deviceId,deviceGroup,engineStatus,locationType,sensorType,tags, msg } = updateAvailableDevicesDto;
    
    console.log(updateAvailableDevicesDto["deviceId"])
    var availableDevices = await this.getAvailableDevicesByDeviceId(updateAvailableDevicesDto["deviceId"],null);
    if(!availableDevices || availableDevices == null || availableDevices == undefined){
      availableDevices = new AvailableDevicesEntity();
    }


    availableDevices.deviceName = updateAvailableDevicesDto["deviceName"];
    availableDevices.deviceId = updateAvailableDevicesDto["deviceId"];
    availableDevices.connectionStatus = updateAvailableDevicesDto["connectionStatus"];
    availableDevices.msg = updateAvailableDevicesDto["msg"];
    availableDevices.deviceGroup = updateAvailableDevicesDto["deviceGroup"];
    availableDevices.locationType = updateAvailableDevicesDto["locationType"];
    availableDevices.engineStatus = updateAvailableDevicesDto["engineStatus"];
    availableDevices.sensorType = updateAvailableDevicesDto["sensorType"];
    availableDevices.tags = updateAvailableDevicesDto["tags"];
    await availableDevices.save();
    return availableDevices;
  }
}
