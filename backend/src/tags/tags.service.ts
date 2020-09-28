import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreatTagsDto } from './dto/create-tags.dto';
import { GetTagsFilterDto } from './dto/get-tags.dto';
import { TagsEntity } from './tags.entity';
import { TagsRepository } from './tags.repository';
import { ZoneRepository } from '../zone/zone.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
    @InjectRepository(ZoneRepository)
    private zoneRepository: ZoneRepository,
  ) {}

  getTags(tagsFilterDto: GetTagsFilterDto, user: User): Promise<TagsEntity[]> {
    return this.tagsRepository.getTags(tagsFilterDto, user);
  }

  async getTagsById(id: number, user: User): Promise<TagsEntity> {
    const found = await this.tagsRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Oranization with id: ${id} not found`);
    }
    return found;
  }

  async deleteTags(id: number, user: User) {
    const result = await this.tagsRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Oranization with id: ${id} not found`);
    }
    // await this.zoneRepository.delete({tagsId: id })
  }

  async createTags(createTagsDto: CreatTagsDto, user: User): Promise<TagsEntity> {
    return await this.tagsRepository.createTags(createTagsDto, user);
  }

  async updateTags(id: number,  user: User,  description: string): Promise<TagsEntity> {
    const tags = await this.getTagsById(id, user);
    // tags.description = description;
    await tags.save();
    return tags;
  }
}
