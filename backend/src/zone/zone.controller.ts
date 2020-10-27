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
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ZoneEntity } from './zone.entity';
import { ZoneService } from './zone.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('zone')
@Controller('zone')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ZoneController {
  private logger = new Logger('ZoneController');
  constructor(private zonesService: ZoneService) {}

  @Get('/:orgId')
  @ApiOperation({ summary: 'Get All Zones by Organization Id' })
  getAllzones(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<ZoneEntity[]> {
    return this.zonesService.getzones(orgId);
  }
  
  @Get('hub/:hubId')
  @ApiOperation({ summary: 'Get All Zones by Hub Id' })
  getZonesHub(
    @Param('hubId', ParseIntPipe) hubId: number,
    @GetUser() user: User,
  ): Promise<ZoneEntity[]> {
    return this.zonesService.getzonesHub(hubId);
  }

  @Get('/details/:id')
  @ApiOperation({ summary: 'Get Zone by Id' })
  getzoneById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<ZoneEntity> {
    //Get Org from here
    return this.zonesService.getzoneById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create Zone' })
  createzone(
    @Body() createzoneDto: CreateZoneDto,
    @GetUser() user: User,
  ): Promise<ZoneEntity> {
    //Get Org from here
    return this.zonesService.createzone(createzoneDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Zone' })
  deletezone(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.zonesService.deletezone(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Zone' })
  updatezone(
    @Param('id', ParseIntPipe) id: number,
    @Body() createzoneDto: CreateZoneDto,
    @GetUser() user: User,
  ): Promise<ZoneEntity> {
    //Get Org from here
    return this.zonesService.updatezone(id, createzoneDto);
  }

  @Post('/saveChanges')
  @ApiOperation({ summary: 'Update Zone' })
  saveChanges(
    @Body() updateZoneDtos: [UpdateZoneDto],
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.zonesService.saveChanges(updateZoneDtos);
  }
}
