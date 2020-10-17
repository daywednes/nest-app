import { IsNotEmpty } from 'class-validator';
export class CreateAutomationsDto {
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  data: string;
  @IsNotEmpty()
  orgId: number;
}
