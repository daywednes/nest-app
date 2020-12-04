
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
  deviceName: string;
  @Column()
  deviceId: string;
  @Column()
  msg: string;
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
  
  isAddNew: boolean;

}
