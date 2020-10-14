import { User } from '../auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from '../zone/zone.entity';
import { DeviceEntity } from 'src/device/device.entity';
import { TagsEntity } from 'src/tags/tags.entity';

@Entity()
export class TagsDevicesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => TagsEntity,
    tag => tag.id,
  )
  tag: TagsEntity;
  
  
  @ManyToOne(
    type => DeviceEntity,
    device => device.id,
  )
  device: DeviceEntity;


}
