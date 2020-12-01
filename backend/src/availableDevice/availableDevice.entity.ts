
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AvailableDevicesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  deviceGroup: string;
  @Column()
  locationType: string;
  @Column()
  sensorType: string;
  @Column()
  tags: string;
  @Column()
  engineStatus: string;
  @Column()
  connectionStatus: string;

}
