import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateDeviceStatusDto } from './dto/create-deviceStatus.dto';
import { GetDeviceStatusFilterDto } from './dto/get-deviceStatus.dto';
import { DeviceStatusEntity } from './deviceStatus.entity';
import { HubsEntity } from '../hubs/hubs.entity';

@EntityRepository(DeviceStatusEntity)
export class DeviceStatusRepository extends Repository<DeviceStatusEntity> {
  private logger = new Logger('DeviceStatusRepository');

  async getDeviceStatus(
    deviceStatusFilterDto: GetDeviceStatusFilterDto,
    user: User,
  ): Promise<DeviceStatusEntity[]> {
    // const { hubId } = deviceStatusFilterDto;
    const query = this.createQueryBuilder('deviceStatus_entity');
    // query.where('deviceStatus_entity.userId = :userId', { userId: user.id });
    // if (name) {
    //   query.where(`deviceStatus_entity.hubId = :hubId`, { hubId });
    // }

    try {
      const deviceStatus = await query.getMany();
      return deviceStatus;
    } catch (err) {
      this.logger.error(
        `Failed to get DeviceStatus for user ${
          user.username
        } with dto ${JSON.stringify(deviceStatusFilterDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getDeviceStatusByhubId(
    hubId: string,
    user: User,
  ): Promise<DeviceStatusEntity[]> {
    const query = this.createQueryBuilder('deviceStatus_entity');
    query.where('deviceStatus_entity.hubId = :hubId', { hubId: hubId });

    try {
      const deviceStatus = await query.getMany();
      return deviceStatus;
    } catch (err) {
      this.logger.error(
        `Failed to get DeviceStatus for device ${hubId}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createDeviceStatus(
    createDeviceStatusDto: CreateDeviceStatusDto,
    hub: HubsEntity,
  ): Promise<DeviceStatusEntity> {
    const { name, status,deviceGroup,locationType,sensorType,message } = createDeviceStatusDto;
    const deviceStatus = new DeviceStatusEntity();
    deviceStatus.name = name;
    deviceStatus.status = status;
    deviceStatus.deviceGroup = deviceGroup;
    deviceStatus.locationType = locationType;
    deviceStatus.sensorType = sensorType;
    deviceStatus.message = message;
    deviceStatus.hub = hub;
    await deviceStatus.save();
    return deviceStatus;
  }
}
