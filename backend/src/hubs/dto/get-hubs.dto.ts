import { IsOptional } from 'class-validator';

export class GetHubsFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
  
}
