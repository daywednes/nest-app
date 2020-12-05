import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgEntity } from 'src/org/org.entity';
import { User } from 'src/auth/user.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ZoneEntity } from './zone.entity';
import { ZoneRepository } from './zone.repository';
import { OrgRepository } from '../org/org.repository';
import { HubsRepository } from '../hubs/hubs.repository';
import { DeviceRepository } from '../device/device.repository';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
    @InjectRepository(OrgRepository)
    private orgRepository: OrgRepository,
    @InjectRepository(HubsRepository)
    private hubsRepository: HubsRepository,
    @InjectRepository(DeviceRepository)
    private deviceRepository: DeviceRepository,
  ) {}

  getzones(orgId: number): Promise<ZoneEntity[]> {
    return this.zoneRepository.getZones(orgId);
  }

  getzonesHub(hubId: number): Promise<ZoneEntity[]> {
    return this.zoneRepository.getZonesHub(hubId);
  }

  async getzoneById(id: number): Promise<ZoneEntity> {
    const found = await this.zoneRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(` ${id} not found`);
    }
    return found;
  }

  async deletezone(id: number) {
    const result = await this.zoneRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Zone with id: ${id} not found`);
    }
  }

  async createzone(
    createzoneDto: CreateZoneDto,
    user: User,
  ): Promise<ZoneEntity> {
    const org = await this.orgRepository.findOne({
      where: { id: createzoneDto.orgId },
    });
    const hub = await this.hubsRepository.findOne({
      where: { id: createzoneDto.hubId },
    });
    return await this.zoneRepository.createZone(createzoneDto, org, hub);
  }

  async updatezone(
    id: number,
    createzoneDto: CreateZoneDto,
  ): Promise<ZoneEntity> {
    const zone = await this.getzoneById(id);
    const hub = await this.hubsRepository.findOne({
      where: { id: createzoneDto.hubId },
    });
    zone.description = createzoneDto.description
      ? createzoneDto.description
      : zone.description;
    zone.name = createzoneDto.name ? createzoneDto.name : zone.name;
    zone.index = createzoneDto.index ? createzoneDto.index : zone.index;
    await zone.save();
    return zone;
  }

  async saveChanges(updateZoneDtos: [UpdateZoneDto]): Promise<void> {
    try {
      for (const zoneDto of updateZoneDtos) {
        const zone = await this.getzoneById(zoneDto.id);
        zone.index = zoneDto.index;
        await zone.save();
        for (const deviceDto of zoneDto.devices) {
          const device = await this.deviceRepository.findOne({
            where: { id: deviceDto.id },
          });

          device.zone = zone;
          device.index = deviceDto.index;
          await device.save();
        }
      }
    } catch (error) {
      console.log('error' + error);
      throw new InternalServerErrorException();
    }
  }
  async updateZoneName(updateZoneDtos: UpdateZoneDto): Promise<void> {
    try {
      if (updateZoneDtos.id > -1) {
        const zone = await this.getzoneById(updateZoneDtos.id);
        zone.name = updateZoneDtos.name;
        await zone.save();
      }
    } catch (error) {
      console.log('error' + error);
      throw new InternalServerErrorException();
    }
  }
}
