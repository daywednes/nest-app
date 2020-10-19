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
import { CreateHubsDto } from './dto/create-hubs.dto';
import { HubsEntity } from './hubs.entity';
import { HubsService } from './hubs.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('hubs')
@Controller('hubs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class HubsController {
  private logger = new Logger('HubsController');
  constructor(private hubssService: HubsService) {}

  @Get('/:orgId')
  @ApiOperation({ summary: 'Get Hubs by Organization Id' })
  getAllhubss(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<HubsEntity[]> {
    return this.hubssService.gethubss(orgId);
  }

  @Get('/details/:id')
  @ApiOperation({ summary: 'Get Hub Detail by Hub Id' })
  gethubsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<HubsEntity> {
    //Get Org from here
    return this.hubssService.gethubsById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Hub' })
  @UsePipes(ValidationPipe)
  createhubs(
    @Body() createhubsDto: CreateHubsDto,
    @GetUser() user: User,
  ): Promise<HubsEntity> {
    //Get Org from here
    return this.hubssService.createhubs(createhubsDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Hub by Hub Id' })
  deletehubs(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.hubssService.deletehubs(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Hub by Hub Id' })
  updatehubs(
    @Param('id', ParseIntPipe) id: number,
    @Body() createhubsDto: CreateHubsDto,
    @GetUser() user: User,
  ): Promise<HubsEntity> {
    //Get Org from here
    return this.hubssService.updatehubs(id, createhubsDto);
  }
}
