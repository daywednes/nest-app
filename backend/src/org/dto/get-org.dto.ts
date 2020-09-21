import { IsOptional } from 'class-validator';

export class GetOrgFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
