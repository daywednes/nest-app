import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAutomationsDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsOptional()
  @ApiProperty()
  type: number;
  @IsOptional()
  @ApiProperty()
  status: string;
  @IsOptional()
  @ApiProperty()
  activated: boolean;

  @IsOptional()
  @ApiProperty()
  data: string;

  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
}
