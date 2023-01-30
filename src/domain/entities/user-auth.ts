import { Entity } from '../generics/entity';

export type UserAuth = Entity & {
  userId: string;
  accessToken: string;
  refreshToken: string;
};