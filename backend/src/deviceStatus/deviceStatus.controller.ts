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
import { CreateDeviceStatusDto } from './dto/create-deviceStatus.dto';
import { GetDeviceStatusFilterDto } from './dto/get-deviceStatus.dto';
import { DeviceStatusEntity } from './deviceStatus.entity';
import { DeviceStatusService } from './deviceStatus.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('deviceStatus')
@Controller('deviceStatus')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class DeviceStatusController {
  private logger = new Logger('DeviceStatusController');
  constructor(private DeviceStatusService: DeviceStatusService) {}

  @Get()
  
  @ApiOperation({ summary: 'Get All DeviceStatus' })
  getAllDeviceStatus(
    @Query(ValidationPipe) getDeviceStatusFilterDto: GetDeviceStatusFilterDto,
    @GetUser() user: User,
  ): Promise<DeviceStatusEntity[]> {
    this.logger.verbose(
      `User ${user.username} retriveing all DeviceStatus with filter ${JSON.stringify(
        getDeviceStatusFilterDto,
      )}`,
    );
    return this.DeviceStatusService.getDeviceStatus(getDeviceStatusFilterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get DeviceStatus by Hub Id' })
  getDeviceStatusByhubId(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User,
  ): Promise<DeviceStatusEntity[]> {
    return this.DeviceStatusService.getDeviceStatusByhubId(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create Available Device' })
  @UsePipes(ValidationPipe)
  createDeviceStatus(
    @Body() createDeviceStatusDto: CreateDeviceStatusDto,
    @GetUser() user: User,
  ): Promise<DeviceStatusEntity> {
    return this.DeviceStatusService.createDeviceStatus(createDeviceStatusDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Available Device' })
  deleteDeviceStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.DeviceStatusService.deleteDeviceStatus(id, user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Available Device' })
  updateDeviceStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeviceStatusDto: CreateDeviceStatusDto,
    @GetUser() user: User,
  ): Promise<DeviceStatusEntity> {
    return this.DeviceStatusService.updateDeviceStatus(id, user, updateDeviceStatusDto);
  }
}
