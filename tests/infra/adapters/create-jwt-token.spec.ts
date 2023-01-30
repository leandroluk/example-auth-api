import { CreateJwtTokenAdapterImpl } from '$/infra/adapters/create-jwt-token';
import vars from '$/vars';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSubject } from 'tests/helper';

jest.mock('crypto', () => ({
  randomBytes: () => ({
    toString: () => 'hex',
  }),
}));

const makeSut = (): {
  sut: CreateJwtTokenAdapterImpl;
} => {
  const sut = new CreateJwtTokenAdapterImpl();
  return {
    sut,
  };
};

describe('CreateJwtTokenAdapterImpl', () => {
  it('Should add an salt, reverse and convert subject before generate token', async () => {
    const { sut } = makeSut();
    const signSpy = jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(() => 'sign');
    await sut.create({ subject: 'sub', expires: 1 });
    expect(signSpy.mock.lastCall).toMatchObject([{}, vars.jwt.privateKey, {
      algorithm: vars.jwt.algorithm,
      issuer: vars.jwt.issuer,
      audience: vars.jwt.audience,
      subject: jwtSubject,
      expiresIn: 1,
    }]);
  });
});