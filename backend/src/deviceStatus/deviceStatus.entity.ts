import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';
import { HubsEntity } from '../hubs/hubs.entity';

@Entity()
export class DeviceStatusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ default: '' })
  status: string;
  @Column({ default: '' })
  message: string;
  @Column({ default: '' })
  locationType: string;
  @Column({ default: '' })
  deviceGroup: string;
  @Column({ default: '' })
  sensorType: string;
  @Column({ default: false })
  isDefine: boolean;

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
    type => HubsEntity,
    hub => hub.deviceStatus,
    { eager: false },
  )
  hub: HubsEntity;

  @Column()
  hubId: number;
}
