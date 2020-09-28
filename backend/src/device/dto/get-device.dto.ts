import { IsOptional } from 'class-validator';
import { DeviceEntity } from '../device.entity';
import { TagsEntity } from 'src/tags/tags.entity';

export class GetDeviceFilterDto {
  @IsOptional()
  devices: DeviceEntity;

  @IsOptional()
  tags: [String];
  
}
