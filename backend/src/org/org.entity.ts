import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZoneEntity } from './zone.entity';

@Entity()
export class OrgEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(
    type => User,
    user => user.orgs,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @OneToMany(
    type => ZoneEntity,
    zone => zone.org,
    { eager: true },
  )
  zones: ZoneEntity[];
}
