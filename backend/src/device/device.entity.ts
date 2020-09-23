import { User } from 'src/auth/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from '../zone/zone.entity';
import { OrgEntity } from 'src/org/org.entity';

@Entity('device')
export class DeviceEntity {
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

  @Column({ default: 0 })
  favoriteCount: number;
}
