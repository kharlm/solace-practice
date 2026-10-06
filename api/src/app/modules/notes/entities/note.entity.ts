import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  body: string;

  // timestamptz stores an absolute instant; plain timestamp gets read as local time.
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  // The foreign key column. Exposing it lets us filter and insert by userId
  // without loading the whole User.
  @Column()
  userId: number;

  // Many notes belong to one user. Deleting a user deletes their notes.
  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
