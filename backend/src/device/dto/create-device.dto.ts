import { IsNotEmpty, IsOptional } from 'class-validator';
import { TagsEntity } from 'src/tags/tags.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDeviceDto {
  @IsNotEmpty()
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
  @IsNotEmpty()
  @ApiProperty()
  orgId: number;
  @IsNotEmpty()
  @ApiProperty()
  zoneId: number;
  @IsOptional()
  @ApiProperty()
  tagsName: [string];
}
