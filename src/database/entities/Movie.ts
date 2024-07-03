import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from './Session';
@Entity()
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

  @Column()
  release_date: string;

  @OneToMany(() => Session, (session) => session.movie)
  sessions: Session[];
}
