import { Entity } from '../generics/entity';

export type User = Entity & {
  displayName: string;
  email: string;
  password: string;
};