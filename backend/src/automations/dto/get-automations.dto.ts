import { IsOptional } from 'class-validator';

export class GetAutomationsFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  status: string;

  @IsOptional()
  data: string;
}
