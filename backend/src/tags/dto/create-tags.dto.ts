import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatTagsDto {
  @IsNotEmpty()
  name: string;
}
