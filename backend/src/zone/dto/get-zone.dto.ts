import { IsOptional } from 'class-validator';

export class GetZoneFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
}
