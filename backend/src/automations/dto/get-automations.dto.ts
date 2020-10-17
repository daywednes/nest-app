import { IsOptional } from 'class-validator';

export class GetAutomationsFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
  
}
