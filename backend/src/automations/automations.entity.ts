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
  name: string;

  @Column()
  description: string;
  
  @Column({ default: 0 })
  type: number;

  @Column()
  status: string;

  @Column()
  data: string;
  @Column({ default: new Date() })
  lastTimeUpdate: Date;
  @Column({ default: new Date() })
  lastTimeStartAutomation: Date;

  @ManyToOne(
    type => OrgEntity,
    org => org.zones,
    { eager: false },
  )
  org: OrgEntity;

  @Column()
  orgId: number;
}
