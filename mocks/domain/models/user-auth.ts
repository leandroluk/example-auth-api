import { UserAuth } from '$/domain/entities/user-auth';

export const mockUserAuth: UserAuth = {
  id: 'id',
  timestamp: new Date(),
  created: new Date(),
  removed: null,
  userId: 'userId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};