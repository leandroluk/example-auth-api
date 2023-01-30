import { UserAuth } from '$/domain/entities/user-auth';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER_AUTH } from '../constants';

@Entity(TABLE_USER_AUTH)
export class UserAuthEntity implements UserAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ type: 'timestamptz' })
  created: Date;

  @Column({ type: 'timestamptz', nullable: true })
  removed?: Date;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ name: 'access_token' })
  accessToken: string;

  @Column({ name: 'refresh_token' })
  refreshToken: string;
}