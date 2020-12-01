import { IsOptional } from 'class-validator';

export class GetAvailableDevicesFilterDto {
  @IsOptional()
  name: string;
  @IsOptional()
  description: string;
  @IsOptional()
  deviceGroup: string;
  @IsOptional()
  locationType: string;
  @IsOptional()
  sensorType: string;
  @IsOptional()
  tags: string;
  @IsOptional()
  engineStatus: string;
  @IsOptional()
  connectionStatus: string;
}
