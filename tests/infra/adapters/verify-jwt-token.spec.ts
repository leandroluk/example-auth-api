import { VerifyJwtTokenAdapterImpl } from '$/infra/adapters/verify-jwt-token';
import { jwtSubject } from 'tests/helper';

jest.mock('jsonwebtoken', () => ({
  verify: () => ({ sub: jwtSubject }),
}));

const makeSut = (): {
  sut: VerifyJwtTokenAdapterImpl;
} => {
  const sut = new VerifyJwtTokenAdapterImpl();
  return {
    sut,
  };
};

describe('VerifyJwtTokenAdapterImpl', () => {
  it('Should return decoded subject when success', async () => {
    const { sut } = makeSut();
    await expect(sut.verify('token')).resolves.toBe('sub');
  });
});