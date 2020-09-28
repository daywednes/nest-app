import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ZoneEntity } from '../zone/zone.entity';
import { OrgEntity } from 'src/org/org.entity';
import { TagsDevicesEntity } from 'src/tags/tags_divice.entity';

@Entity('device')
export class DeviceEntity  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }
  @BeforeInsert()
  insertTimestamp() {
    this.created = new Date();
  }

  @ManyToOne(
    type => User,
    user => user.devices,
  )
   user: User;

  @ManyToOne(
    type => ZoneEntity,
    zone => zone.devices,
  )
  zone: ZoneEntity;

  @ManyToOne(
    type => OrgEntity,
    org => org.devices,
  )
  org: OrgEntity;

  @OneToMany(
    type => TagsDevicesEntity,
    tagsdevice => tagsdevice.device,
    { eager: true },
  )
  tagsdevice: TagsDevicesEntity[];


  @Column({ default: 0 })
  favoriteCount: number;
}
