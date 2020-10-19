import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAutomationsDto {
  @IsNotEmpty()
  @ApiProperty()
  status: string;
  
  @IsNotEmpty()
  @ApiProperty()
  data: string;

  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
}
