import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { HubsEntity } from '../hubs/hubs.entity';

@Entity()
export class ActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastTimeUpdate: Date;
  @ManyToOne(
    type => HubsEntity,
    hub => hub.activities,
    { eager: false },
  )
  hub: HubsEntity;
  
  @Column()
  hubId: number;
}
