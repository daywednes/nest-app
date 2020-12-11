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

  @Column({ default: "" })
  description: string;
  
  @Column({ default: 0 })
  type: number;

  @Column({ default: "" })
  status: string;

  @Column({ default: "" })
  data: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastTimeUpdate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastTimeStartAutomation: Date;



  @ManyToOne(
    type => OrgEntity,
    org => org.zones,
    { eager: false },
  )
  org: OrgEntity;

  @Column()
  orgId: number;

  
  @Column({ type: Boolean, default: () => false })
  activated: boolean;
}
