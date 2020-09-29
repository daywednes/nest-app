import { IsNotEmpty, IsOptional } from 'class-validator';
import { TagsEntity } from 'src/tags/tags.entity';
export class CreateDeviceDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  orgId: number;
  @IsOptional()
  tagsName: [string];
}
