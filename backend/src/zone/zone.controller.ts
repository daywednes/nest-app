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
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { GetZoneFilterDto } from './dto/get-zone.dto';
import { ZoneEntity } from './zone.entity';
import { ZoneService } from './zone.service';
import { OrgService } from '../org/Org.service';

@Controller('zone')
@UseGuards(AuthGuard())
export class ZoneController {
  private logger = new Logger('ZoneController');
  constructor(private zonesService: ZoneService) {}

  @Get()
  getAllzones(
    @GetUser() user: User,
  ): Promise<ZoneEntity[]> {
    return this.zonesService.getzones(user);
  }

  @Get('/:id')
  getzoneById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<ZoneEntity> {
    //Get Org from here
    return this.zonesService.getzoneById(id, null);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createzone(
    @Body() createzoneDto: CreateZoneDto,
    @GetUser() user: User,
  ): Promise<ZoneEntity> {
    //Get Org from here
    return this.zonesService.createzone(createzoneDto, null);
  }

  @Delete('/:id')
  deletezone(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.zonesService.deletezone(id, null);
  }

  @Patch('/:id')
  updatezone(
    @Param('id', ParseIntPipe) id: number,
    @Body() description: string,
    @GetUser() user: User,
  ): Promise<ZoneEntity> {
    //Get Org from here
    return this.zonesService.updatezone(id, description);
  }
}
