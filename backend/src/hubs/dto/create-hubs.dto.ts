import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateHubsDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
}
