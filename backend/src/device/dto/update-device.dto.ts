import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateDeviceDto {
  @IsNotEmpty()
  id: string;
  @IsOptional()
  name: string;
  @IsOptional()
  description: string;
  @IsOptional()
  orgId: number;
  @IsOptional()
  zoneId: number;
  @IsOptional()
  tags: [string];
}
