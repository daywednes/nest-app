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
import { CreateOrganizationDto } from './dto/create-org.dto';
import { GetOrgFilterDto } from './dto/get-org.dto';
import { OrgEntity } from './org.entity';
import { OrgService } from './org.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('org')
@Controller('org')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class OrgController {
  private logger = new Logger('OrgController');
  constructor(private OrgService: OrgService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Organization' })
  getAllOrg(
    @Query(ValidationPipe) getOrgFilterDto: GetOrgFilterDto,
    @GetUser() user: User,
  ): Promise<OrgEntity[]> {
    this.logger.verbose(
      `User ${user.username} retriveing all Org with filter ${JSON.stringify(
        getOrgFilterDto,
      )}`,
    );
    return this.OrgService.getOrg(getOrgFilterDto, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Organizations by Id' })
  getOrgById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<OrgEntity> {
    return this.OrgService.getOrgById(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create Organizations' })
  @UsePipes(ValidationPipe)
  createOrg(
    @Body() createOrgDto: CreateOrganizationDto,
    @GetUser() user: User,
  ): Promise<OrgEntity> {
    return this.OrgService.createOrg(createOrgDto, user);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete Organization by Id' })
  deleteOrg(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.OrgService.deleteOrg(id, user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Organization by Organization Id' })
  updateOrg(
    @Param('id', ParseIntPipe) id: number,
    @Body() description: string,
    @GetUser() user: User,
  ): Promise<OrgEntity> {
    return this.OrgService.updateOrg(id, user, description);
  }
}
