import { ForbiddenError } from '$/data/errors/forbidden';
import { UnauthorizedError } from '$/data/errors/unauthorized';
import { GetUserAuthTaskImpl } from '$/data/tasks/get-user-auth';
import { GetUserAuthTask } from '$/presentation/protocols/get-user-auth';
import { MockGetUserAuthRepo } from 'mocks/data/protocols/repos/get-user-auth';

const makeSut = (): {
  getUserAuthRepo: MockGetUserAuthRepo;
  sut: GetUserAuthTaskImpl;
  where: GetUserAuthTask.Where;
} => {
  const getUserAuthRepo = new MockGetUserAuthRepo();
  const sut = new GetUserAuthTaskImpl(
    getUserAuthRepo,
    new UnauthorizedError(),
    new ForbiddenError()
  );
  const where: GetUserAuthTask.Where = {};
  return {
    getUserAuthRepo,
    sut,
    where,
  };
};

describe('GetUserAuthTaskImpl', () => {
  it('Should throw if getUserAuthRepo throws', async () => {
    const { sut, getUserAuthRepo, where } = makeSut();
    jest.spyOn(getUserAuthRepo, 'get').mockRejectedValue(new Error());
    await expect(sut.get(where)).rejects.toThrow();
  });

  it('Should throw if getUserAuthRepo returns falsy', async () => {
    const { sut, getUserAuthRepo, where } = makeSut();
    getUserAuthRepo.$get = undefined;
    await expect(sut.get(where)).rejects.toThrow(UnauthorizedError);
  });

  it('Should throw if getUserAuthRepo returns removed', async () => {
    const { sut, getUserAuthRepo, where } = makeSut();
    getUserAuthRepo.$get.removed = new Date();
    await expect(sut.get(where)).rejects.toThrow(ForbiddenError);
  });

  it('Should return userAuth', async () => {
    const { sut, where } = makeSut();
    await expect(sut.get(where)).resolves.toBeDefined();
  });
});