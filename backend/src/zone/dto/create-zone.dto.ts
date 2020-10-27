import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateZoneDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
  @IsNotEmpty()
  @ApiProperty()
  hubId: number;
  @IsOptional()
  @ApiProperty()
  index: number;
}
