import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateDeviceDto } from '../../device/dto/update-device.dto';
export class UpdateZoneDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
  @IsOptional()
  @ApiProperty()
  index: number;
  @IsOptional()
  @ApiProperty()
  name: string;
  @IsOptional()
  @ApiProperty()
  devices: [UpdateDeviceDto];
}
