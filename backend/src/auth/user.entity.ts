import * as bcrypt from 'bcrypt';
import { DeviceEntity } from 'src/org/device.entity';
import { OrgEntity } from 'src/org/org.entity';
import { Task } from 'src/tasks/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[];

  @OneToMany(
    type => DeviceEntity,
    device => device.user,
    { eager: true },
  )
  devices: DeviceEntity[];

  @OneToMany(
    type => OrgEntity,
    org => org.user,
    { eager: true },
  )
  orgs: OrgEntity[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
