import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrganizationDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
