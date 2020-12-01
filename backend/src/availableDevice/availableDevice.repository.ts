import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateAvailableDevicesDto } from './dto/create-availableDevice.dto';
import { GetAvailableDevicesFilterDto } from './dto/get-availableDevice.dto';
import { AvailableDevicesEntity } from './availableDevice.entity';

@EntityRepository(AvailableDevicesEntity)
export class AvailableDevicesRepository extends Repository<AvailableDevicesEntity> {
  private logger = new Logger('AvailableDevicesRepository');

  async getAvailableDevices(
    availableDevicesFilterDto: GetAvailableDevicesFilterDto,
    user: User,
  ): Promise<AvailableDevicesEntity[]> {
    const { name } = availableDevicesFilterDto;
    const query = this.createQueryBuilder('availableDevices_entity');
    // query.where('availableDevices_entity.userId = :userId', { userId: user.id });
    if (name) {
      query.where(`availableDevices_entity.name = :name`, { name });
    }

    try {
      const availableDevices = await query.getMany();
      return availableDevices;
    } catch (err) {
      this.logger.error(
        `Failed to get AvailableDevices for user ${user.username} with dto ${JSON.stringify(
          availableDevicesFilterDto,
        )}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getAvailableDevicesByDeviceId(deviceId: number, user: User): Promise<AvailableDevicesEntity[]> {
    const query = this.createQueryBuilder('availableDevices_entity').leftJoinAndSelect(
      'availableDevices_entity.availableDevicesdevice',
      'availableDevicesdevice',
    );
    // query.where('availableDevicesdevice.device.id = :deviceId', { deviceId: deviceId });

    try {
      const availableDevices = await query.getMany();
      return availableDevices;
    } catch (err) {
      this.logger.error(`Failed to get AvailableDevices for device ${deviceId}`, err.stack);
      throw new InternalServerErrorException();
    }
  }

  async createAvailableDevices(
    createAvailableDevicesDto: CreateAvailableDevicesDto,
    user: User,
  ): Promise<AvailableDevicesEntity> {
    const { name,connectionStatus,description,deviceGroup,engineStatus,locationType,sensorType,tags } = createAvailableDevicesDto;
    const availableDevices = new AvailableDevicesEntity();
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
