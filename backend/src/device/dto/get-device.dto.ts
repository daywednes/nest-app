import { IsOptional } from 'class-validator';

export class GetDeviceFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;
  
}
