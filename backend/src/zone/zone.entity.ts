import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceEntity } from '../device/device.entity';
import { OrgEntity } from '../org/org.entity';
import { HubsEntity } from '../hubs/hubs.entity';

@Entity()
export class ZoneEntity extends BaseEntity {
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

  @ManyToOne(
    type => HubsEntity,
    hub => hub.zones,
    { eager: false },
  )
  hub: HubsEntity;
  
  @Column()
  hubId: number;


  @OneToMany(
    type => DeviceEntity,
    device => device.zone,
    { eager: true },
  )
  devices: DeviceEntity[];
}
