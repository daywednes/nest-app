import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { DeviceEntity } from './device.entity';
import { DeviceService } from './device.service';
import { AddDeviceZoneDto } from './dto/add-device-to-zone.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';


@ApiTags('device')
@ApiBearerAuth()
@Controller('device')
@UseGuards(AuthGuard())
export class DeviceController {
  private logger = new Logger('DeviceController');
  constructor(private devicesService: DeviceService) {}

  @Get('/:orgId')
  @ApiOperation({ summary: 'Get Devices by Organization Id' })
  getAlldevices(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity[]> {
    return this.devicesService.getdevices(orgId, user);
  }

  @Get('/getDevicesAvail/:orgId')
  @ApiOperation({ summary: 'Get Devices Available by Organization Id' })
  getDevicesAvail(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity[]> {
    return this.devicesService.getDevicesAvail(orgId);
  }

  @Get('/zone/:zoneId')
  @ApiOperation({ summary: 'Get Devices by Zone Id' })
  getByZone(
    @Param('zoneId', ParseIntPipe) zoneId: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity[]> {
    return this.devicesService.getdevicesbyzone(zoneId);
  }

  @Get('/details/:id')
  @ApiOperation({ summary: 'Get Device detail by Device Id' })
  getdeviceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.getdeviceById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create New Device' })
  createdevice(
    @Body() createdeviceDto: CreateDeviceDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.createdevice(createdeviceDto, user);
  }

  @Post('/addToZone/')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Add Device to Zone' })
  addToZone(
    @Body() dto: AddDeviceZoneDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.addToZone(dto);
  }

  @Post('/removeFromZone/')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Reomve Device from Zone' })
  removeFromZone(
    @Body() dto: AddDeviceZoneDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.removeFromZone(dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Reomve Device by Id' })
  deletedevice(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.devicesService.deletedevice(id);
  }

  @Post('/:id')
  @ApiOperation({ summary: 'Update Device by Device Id' })
  updatedevice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.updatedevice(id, updateDeviceDto, user);
  }
}
