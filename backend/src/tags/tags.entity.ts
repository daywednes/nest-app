import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from '../zone/zone.entity';
import { TagsDevicesEntity } from 'src/tags/tags_divice.entity';

@Entity()
export class TagsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;



  @Column()
  userId: number;

  @OneToMany(
    type => TagsDevicesEntity,
    tagsdevice => tagsdevice.tag,
    { eager: false },
  )
  tagsdevice: TagsDevicesEntity[];
}
