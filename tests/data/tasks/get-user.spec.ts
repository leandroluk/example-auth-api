import { ForbiddenError } from '$/data/errors/forbidden';
import { UnauthorizedError } from '$/data/errors/unauthorized';
import { GetUserTaskImpl } from '$/data/tasks/get-user';
import { GetUserTask } from '$/presentation/protocols/get-user';
import { MockGetUserRepo } from 'mocks/data/protocols/repos/get-user';

const makeSut = (): {
  getUserRepo: MockGetUserRepo;
  sut: GetUserTaskImpl;
  where: GetUserTask.Where;
} => {
  const getUserRepo = new MockGetUserRepo();
  const sut = new GetUserTaskImpl(
    getUserRepo,
    new UnauthorizedError(),
    new ForbiddenError()
  );
  const where: GetUserTask.Where = {};
  return {
    getUserRepo,
    sut,
    where,
  };
};

describe('GetUserTaskImpl', () => {
  it('Should throw if getUserRepo throws', async () => {
    const { sut, getUserRepo, where } = makeSut();
    jest.spyOn(getUserRepo, 'get').mockRejectedValue(new Error());
    await expect(sut.get(where)).rejects.toThrow();
  });

  it('Should throw if getUserRepo returns falsy', async () => {
    const { sut, getUserRepo, where } = makeSut();
    getUserRepo.$get = undefined;
    await expect(sut.get(where)).rejects.toThrow(UnauthorizedError);
  });

  it('Should throw if getUserRepo returns removed', async () => {
    const { sut, getUserRepo, where } = makeSut();
    getUserRepo.$get.removed = new Date();
    await expect(sut.get(where)).rejects.toThrow(ForbiddenError);
  });

  it('Should return user', async () => {
    const { sut, where } = makeSut();
    await expect(sut.get(where)).resolves.toBeDefined();
  });
});