import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddDeviceZoneDto {
  @IsNotEmpty()
  @ApiProperty()
  deviceId: number;
  @IsNotEmpty()
  @ApiProperty()
  zoneId: number;
}
