import { User } from '$/domain/entities/user';

export const mockUser: User = {
  id: 'id',
  timestamp: new Date(),
  created: new Date(),
  removed: null,
  email: 'user@email.com',
  displayName: 'name',
  password: 'Test@123',
};