import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreatTagsDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
