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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('automations')
@Controller('automations')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class AutomationsController {
  private logger = new Logger('AutomationsController');
  constructor(private automationssService: AutomationsService) {}

  @Get('/:orgId')
  @ApiOperation({ summary: 'Get Automations by Organization Id' })
  getAllautomationss(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<AutomationsEntity[]> {
    return this.automationssService.getautomationss(orgId);
  }

  @Get('/details/:id')
  @ApiOperation({ summary: 'Get Automation details by Automation Id' })
  getautomationsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<AutomationsEntity> {
    //Get Org from here
    return this.automationssService.getautomationsById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create Automation' })
  createautomations(
    @Body() createautomationsDto: CreateAutomationsDto,
    @GetUser() user: User,
  ): Promise<AutomationsEntity> {
    //Get Org from here
    return this.automationssService.createautomations(createautomationsDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Automation' })
  deleteautomations(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.automationssService.deleteautomations(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Automation' })
  updateautomations(
    @Param('id', ParseIntPipe) id: number,
    @Body() createautomationsDto: CreateAutomationsDto,
    @GetUser() user: User,
  ): Promise<AutomationsEntity> {
    //Get Org from here
    return this.automationssService.updateautomations(id, createautomationsDto);
  }
}
