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
export class AutomationsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  data: string;
  @Column()
  LastTimeUpdate: Date;
  @Column()
  LastTimeStartAutomation: Date;

  @ManyToOne(
    type => OrgEntity,
    org => org.zones,
    { eager: false },
  )
  org: OrgEntity;

  @Column()
  orgId: number;
}