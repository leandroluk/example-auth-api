import { User } from '$/domain/entities/user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER } from '../constants';
import { FullTextFields } from '../decorators';

@FullTextFields<User>(['email', 'displayName'])
@Entity(TABLE_USER)
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ type: 'timestamptz' })
  created: Date;

  @Column({ type: 'timestamptz', nullable: true })
  removed?: Date;

  @Column({ length: 100, name: 'display_name' })
  displayName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;
}
