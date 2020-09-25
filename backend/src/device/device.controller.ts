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
import { CreateDeviceDto } from './dto/create-device.dto';
import { GetDeviceFilterDto } from './dto/get-device.dto';
import { AddDeviceZoneDto } from './dto/add-device-to-zone.dto';
import { DeviceEntity } from './device.entity';
import { DeviceService } from './device.service';
import { OrgService } from '../org/Org.service';

@Controller('device')
@UseGuards(AuthGuard())
export class DeviceController {
  private logger = new Logger('DeviceController');
  constructor(private devicesService: DeviceService) { }

  @Get('/:orgId')
  getAlldevices(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity[]> {
    return this.devicesService.getdevices(orgId);
  }

  @Get('/getDevicesAvail/:orgId')
  getDevicesAvail(
    @Param('orgId', ParseIntPipe) orgId: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity[]> {
    return this.devicesService.getDevicesAvail(orgId);
  }

  @Get('/zone/:zoneId')
  getByZone(
    @Param('zoneId', ParseIntPipe) zoneId: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity[]> {
    return this.devicesService.getdevicesbyzone(zoneId);
  }

  @Get('/details/:id')
  getdeviceById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.getdeviceById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createdevice(
    @Body() createdeviceDto: CreateDeviceDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.createdevice(createdeviceDto, user);
  }

  @Post('/addToZone/')
  @UsePipes(ValidationPipe)
  addToZone(
    @Body() dto: AddDeviceZoneDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.addToZone(dto);
  }

  @Delete('/:id')
  deletedevice(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    //Get Org from here
    return this.devicesService.deletedevice(id);
  }

  @Patch('/:id')
  updatedevice(
    @Param('id', ParseIntPipe) id: number,
    @Body() createdeviceDto: CreateDeviceDto,
    @GetUser() user: User,
  ): Promise<DeviceEntity> {
    //Get Org from here
    return this.devicesService.updatedevice(id, createdeviceDto);
  }
}
