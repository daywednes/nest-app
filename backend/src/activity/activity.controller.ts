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
import { CreateActivityDto } from './dto/create-activity.dto';
import { GetActivityFilterDto } from './dto/get-activity.dto';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('activity')
@Controller('activity')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ActivityController {
  private logger = new Logger('ActivityController');
  constructor(private ActivityService: ActivityService) {}

  @Get()
  
  @ApiOperation({ summary: 'Get All Activity' })
  getAllActivity(
    @Query(ValidationPipe) getActivityFilterDto: GetActivityFilterDto,
    @GetUser() user: User,
  ): Promise<ActivityEntity[]> {
    this.logger.verbose(
      `User ${user.username} retriveing all Activity with filter ${JSON.stringify(
        getActivityFilterDto,
      )}`,
    );
    return this.ActivityService.getActivity(getActivityFilterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Activity by Hub Id' })
  getActivityByhubId(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User,
  ): Promise<ActivityEntity[]> {
    return this.ActivityService.getActivityByhubId(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create Available Device' })
  @UsePipes(ValidationPipe)
  createActivity(
    @Body() createActivityDto: CreateActivityDto,
    @GetUser() user: User,
  ): Promise<ActivityEntity> {
    return this.ActivityService.createActivity(createActivityDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Available Device' })
  deleteActivity(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.ActivityService.deleteActivity(id, user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Available Device' })
  updateActivity(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: CreateActivityDto,
    @GetUser() user: User,
  ): Promise<ActivityEntity> {
    return this.ActivityService.updateActivity(id, user, updateActivityDto);
  }
}
