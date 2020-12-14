import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDeviceStatusDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsOptional()
  @ApiProperty()
  status: string;
  @IsOptional()
  @ApiProperty()
  message: string;
  @IsOptional()
  @ApiProperty()
  locationType: string;
  @IsOptional()
  @ApiProperty()
  deviceGroup: string;
  @IsOptional()
  @ApiProperty()
  sensorType: string;
  @IsNotEmpty()
  @ApiProperty()
  hubId: number;
}