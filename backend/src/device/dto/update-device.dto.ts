import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateDeviceDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
  @IsOptional()
  @ApiProperty()
  name: string;
  @IsOptional()
  @ApiProperty()
  description: string;
  @IsOptional()
  @ApiProperty()
  location: string;
  @IsOptional()
  @ApiProperty()
  locationType: string;
  @IsOptional()
  @ApiProperty()
  orgId: number;
  @IsOptional()
  @ApiProperty()
  zoneId: number;
  @IsOptional()
  @ApiProperty()
  tags: [string];
  @IsOptional()
  @ApiProperty()
  index: number;
}
