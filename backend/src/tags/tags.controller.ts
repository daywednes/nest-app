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
import { CreatTagsDto } from './dto/create-tags.dto';
import { GetTagsFilterDto } from './dto/get-tags.dto';
import { TagsEntity } from './tags.entity';
import { TagsService } from './tags.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TagsController {
  private logger = new Logger('TagsController');
  constructor(private TagsService: TagsService) {}

  @Get()
  
  @ApiOperation({ summary: 'Get All Tags' })
  getAllTags(
    @Query(ValidationPipe) getTagsFilterDto: GetTagsFilterDto,
    @GetUser() user: User,
  ): Promise<TagsEntity[]> {
    this.logger.verbose(
      `User ${user.username} retriveing all Tags with filter ${JSON.stringify(
        getTagsFilterDto,
      )}`,
    );
    return this.TagsService.getTags(getTagsFilterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Tags by Device Id' })
  getTagsById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TagsEntity[]> {
    return this.TagsService.getTagsByDeviceId(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create Tag' })
  @UsePipes(ValidationPipe)
  createTags(
    @Body() createTagsDto: CreatTagsDto,
    @GetUser() user: User,
  ): Promise<TagsEntity> {
    return this.TagsService.createTags(createTagsDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Tag' })
  deleteTags(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.TagsService.deleteTags(id, user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Tag' })
  updateTags(
    @Param('id', ParseIntPipe) id: number,
    @Body() description: string,
    @GetUser() user: User,
  ): Promise<TagsEntity> {
    return this.TagsService.updateTags(id, user, description);
  }
}
