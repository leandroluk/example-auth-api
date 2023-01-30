import { UnauthorizedError } from '$/data/errors/unauthorized';
import { VerifyTokenAndGetUserIdTaskImpl } from '$/data/tasks/verify-token-and-get-user-id';
import { VerifyTokenAndGetUserIdTask } from '$/presentation/protocols/verify-token-and-get-user-id';
import { MockVerifyJwtTokenAdapter } from 'mocks/data/protocols/adapters/verify-jwt-token';

const makeSut = (): {
  verifyJwtTokenAdapter: MockVerifyJwtTokenAdapter;
  sut: VerifyTokenAndGetUserIdTaskImpl;
  token: VerifyTokenAndGetUserIdTask.Token;
} => {
  const verifyJwtTokenAdapter = new MockVerifyJwtTokenAdapter();
  const sut = new VerifyTokenAndGetUserIdTaskImpl(
    verifyJwtTokenAdapter
  );
  const token: VerifyTokenAndGetUserIdTask.Token = 'token';
  return {
    verifyJwtTokenAdapter,
    sut,
    token,
  };
};

describe('VerifyTokenAndGetUserIdTaskImpl', () => {
  it('Should throw UnauthorizedError if verifyJwtTokenAdapter throws', async () => {
    const { sut, verifyJwtTokenAdapter, token } = makeSut();
    jest.spyOn(verifyJwtTokenAdapter, 'verify').mockRejectedValue(new Error());
    await expect(sut.verify(token)).rejects.toThrow(UnauthorizedError);
  });

  it('Should return userId from token if verified', async () => {
    const { sut, token } = makeSut();
    await expect(sut.verify(token)).resolves.toBeDefined();
  });
});