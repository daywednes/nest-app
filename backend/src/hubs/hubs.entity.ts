import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrgEntity } from '../org/org.entity';
import { ZoneEntity } from '../zone/zone.entity';
import { ActivityEntity } from '../activity/activity.entity';
import { DeviceStatusEntity } from '../deviceStatus/deviceStatus.entity';

@Entity()
export class HubsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(
    type => OrgEntity,
    org => org.zones,
    { eager: false },
  )
  org: OrgEntity;

  @Column()
  orgId: number;

  @OneToMany(
    type => ZoneEntity,
    zone => zone.hub,
    { eager: true },
  )
  zones: ZoneEntity[];

  @OneToMany(
    type => ActivityEntity,
    activity => activity.hub,
    { eager: false },
  )
  activities: ActivityEntity[];
  @OneToMany(
    type => DeviceStatusEntity,
    activity => activity.hub,
    { eager: false },
  )
  deviceStatus: DeviceStatusEntity[];
}
