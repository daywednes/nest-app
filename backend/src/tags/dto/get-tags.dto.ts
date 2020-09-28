import { IsOptional } from 'class-validator';

export class GetTagsFilterDto {
  @IsOptional()
  name: string;
}
