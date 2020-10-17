import { IsNotEmpty } from 'class-validator';
export class CreateHubsDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  orgId: number;
}
