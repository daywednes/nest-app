import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAvailableDevicesDto {
  @IsNotEmpty()
  @ApiProperty()
  deviceName: string;
  @IsNotEmpty()
  @ApiProperty()
  deviceId: string;
  @ApiProperty()
  msg: string;
  @ApiProperty()
  deviceGroup: string;
  @ApiProperty()
  locationType: string;
  @ApiProperty()
  sensorType: string;
  @ApiProperty()
  tags: string;
  @ApiProperty()
  engineStatus: string;
  @ApiProperty()
  connectionStatus: string;
}
