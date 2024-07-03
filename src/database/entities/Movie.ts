import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Session } from './Session';
@Entity()
@Unique(['name'])
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  actors: [string];

  @Column({ type: 'datetime' })
  release_date: Date;

  @OneToMany(() => Session, (session) => session.movie)
  sessions: Session[];
}
