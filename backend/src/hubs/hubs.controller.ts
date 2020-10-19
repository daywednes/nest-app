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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('hubs')
@Controller('hubs')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class HubsController {
  private logger = new Logger('HubsController');
  constructor(private hubssService: HubsService) {}

  @Get('/:orgId')
  getAllhubss(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<HubsEntity[]> {
    return this.hubssService.gethubss(orgId);
  }

  @Get('/details/:id')
  gethubsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<HubsEntity> {
    //Get Org from here
    return this.hubssService.gethubsById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createhubs(
    @Body() createhubsDto: CreateHubsDto,
    @GetUser() user: User,
  ): Promise<HubsEntity> {
    //Get Org from here
    return this.hubssService.createhubs(createhubsDto, user);
  }

  @Delete('/:id')
  deletehubs(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.hubssService.deletehubs(id);
  }

  @Patch('/:id')
  updatehubs(
    @Param('id', ParseIntPipe) id: number,
    @Body() createhubsDto: CreateHubsDto,
    @GetUser() user: User,
  ): Promise<HubsEntity> {
    //Get Org from here
    return this.hubssService.updatehubs(id, createhubsDto);
  }
}
