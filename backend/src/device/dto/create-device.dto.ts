import { IsNotEmpty, IsOptional } from 'class-validator';
import { TagsEntity } from 'src/tags/tags.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDeviceDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
  @IsOptional()
  @ApiProperty()
  tagsName: [string];
}
