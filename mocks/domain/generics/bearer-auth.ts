import { BearerAuth } from '$/domain/generics/bearer-auth';

export const mockBearerAuth: BearerAuth = {
  type: 'Bearer',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};