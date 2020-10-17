import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateAutomationsDto } from './dto/create-automations.dto';
import { AutomationsEntity } from './automations.entity';
import { AutomationsService } from './automations.service';

@Controller('automations')
@UseGuards(AuthGuard())
export class AutomationsController {
  private logger = new Logger('AutomationsController');
  constructor(private automationssService: AutomationsService) {}

  @Get('/:orgId')
  getAllautomationss(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<AutomationsEntity[]> {
    return this.automationssService.getautomationss(orgId);
  }

  @Get('/details/:id')
  getautomationsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<AutomationsEntity> {
    //Get Org from here
    return this.automationssService.getautomationsById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createautomations(
    @Body() createautomationsDto: CreateAutomationsDto,
    @GetUser() user: User,
  ): Promise<AutomationsEntity> {
    //Get Org from here
    return this.automationssService.createautomations(createautomationsDto, user);
  }

  @Delete('/:id')
  deleteautomations(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.automationssService.deleteautomations(id);
  }

  @Patch('/:id')
  updateautomations(
    @Param('id', ParseIntPipe) id: number,
    @Body() createautomationsDto: CreateAutomationsDto,
    @GetUser() user: User,
  ): Promise<AutomationsEntity> {
    //Get Org from here
    return this.automationssService.updateautomations(id, createautomationsDto);
  }
}
