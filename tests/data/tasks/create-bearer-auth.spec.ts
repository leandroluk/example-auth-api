import { CreateBearerAuthTaskImpl } from '$/data/tasks/create-bearer-auth';
import { CreateBearerAuthTask } from '$/presentation/protocols/create-bearer-auth';
import { MockCreateJwtTokenAdapter } from 'mocks/data/protocols/adapters/create-jwt-token';

const makeSut = (): {
  createJwtTokenAdapter: MockCreateJwtTokenAdapter;
  sut: CreateBearerAuthTaskImpl;
  userId: CreateBearerAuthTask.UserId;
} => {
  const createJwtTokenAdapter = new MockCreateJwtTokenAdapter();
  const sut = new CreateBearerAuthTaskImpl(
    createJwtTokenAdapter
  );
  const userId = 'userId';
  return {
    createJwtTokenAdapter,
    sut,
    userId,
  };
};

describe('CreateBearerAuthTaskImpl', () => {
  it('Should throw when createJwtTokenAdapter throws', async () => {
    const { sut, createJwtTokenAdapter, userId } = makeSut();
    jest.spyOn(createJwtTokenAdapter, 'create').mockRejectedValue(new Error());
    await expect(sut.create(userId)).rejects.toThrow();
  });

  it('Should return BearerAuthorization', async () => {
    const { sut, createJwtTokenAdapter, userId } = makeSut();
    const result = await sut.create(userId);
    expect(result.type).toBe('Bearer');
    expect(result.accessToken).toBe(createJwtTokenAdapter.$create);
    expect(result.refreshToken).toBe(createJwtTokenAdapter.$create);
  });
});
