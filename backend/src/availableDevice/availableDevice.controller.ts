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
import { CreateAvailableDevicesDto } from './dto/create-availableDevice.dto';
import { GetAvailableDevicesFilterDto } from './dto/get-availableDevice.dto';
import { AvailableDevicesEntity } from './availableDevice.entity';
import { AvailableDevicesService } from './availableDevice.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('availableDevices')
@Controller('availableDevices')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class AvailableDevicesController {
  private logger = new Logger('AvailableDevicesController');
  constructor(private AvailableDevicesService: AvailableDevicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Available Devices' })
  getAllAvailableDevices(
    @Query(ValidationPipe) getAvailableDevicesFilterDto: GetAvailableDevicesFilterDto,
    @GetUser() user: User,
  ): Promise<AvailableDevicesEntity[]> {
    this.logger.verbose(
      `User ${user.username} retriveing all Available Devices with filter ${JSON.stringify(
        getAvailableDevicesFilterDto,
      )}`,
    );
    return this.AvailableDevicesService.getAvailableDevices(getAvailableDevicesFilterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Available Devices by Device Id' })
  getAvailableDevicesById(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User,
  ): Promise<AvailableDevicesEntity> {
    return this.AvailableDevicesService.getAvailableDevicesByDeviceId(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create Available Device' })
  @UsePipes(ValidationPipe)
  createAvailableDevices(
    @Body() createAvailableDevicesDto: CreateAvailableDevicesDto,
    @GetUser() user: User,
  ): Promise<AvailableDevicesEntity> {
    return this.AvailableDevicesService.createAvailableDevices(createAvailableDevicesDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Available Device' })
  deleteAvailableDevices(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.AvailableDevicesService.deleteAvailableDevices(id, user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Available Device' })
  updateAvailableDevices(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvailableDevicesDto: CreateAvailableDevicesDto,
    @GetUser() user: User,
  ): Promise<AvailableDevicesEntity> {
    return this.AvailableDevicesService.updateAvailableDevices(id, user, updateAvailableDevicesDto);
  }
}
