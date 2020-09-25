import { IsNotEmpty } from 'class-validator';
export class AddDeviceZoneDto {
  @IsNotEmpty()
  deviceId: number;
  @IsNotEmpty()
  zoneId: number;
}
