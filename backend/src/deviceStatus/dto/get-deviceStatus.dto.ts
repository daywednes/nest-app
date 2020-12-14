import { IsOptional } from 'class-validator';

export class GetDeviceStatusFilterDto {
  @IsOptional()
  name: string;
  @IsOptional()
  status: string;
  @IsOptional()
  message: string;
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
  @IsOptional()
  hubId: string;
}
