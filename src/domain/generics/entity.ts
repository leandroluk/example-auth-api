import { Updatable } from './updatable';

export type Entity = Updatable & {
  created: Date;
  removed?: Date;
};