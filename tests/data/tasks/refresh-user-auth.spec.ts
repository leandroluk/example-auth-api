import { RefreshUserAuthTaskImpl } from '$/data/tasks/refresh-user-auth';
import { RefreshUserAuthTask } from '$/presentation/protocols/refresh-user-auth';
import { MockEditUserAuthRepo } from 'mocks/data/protocols/repos/edit-user-auth';
import { MockGetUserRepo } from 'mocks/data/protocols/repos/get-user';
import { MockGetUserAuthRepo } from 'mocks/data/protocols/repos/get-user-auth';

const makeSut = (): {
  getUserAuthRepo: MockGetUserAuthRepo;
  getUserRepo: MockGetUserRepo;
  editUserAuthRepo: MockEditUserAuthRepo;
  sut: RefreshUserAuthTaskImpl;
  data: RefreshUserAuthTask.Data;
} => {
  const getUserAuthRepo = new MockGetUserAuthRepo();
  const getUserRepo = new MockGetUserRepo();
  const editUserAuthRepo = new MockEditUserAuthRepo();
  const sut = new RefreshUserAuthTaskImpl(
    editUserAuthRepo
  );
  const data: RefreshUserAuthTask.Data = {
    id: 'id',
    changes: {
      accessToken: 'newAccessToken',
      refreshToken: 'newRefreshToken',
    },
  };
  return {
    getUserAuthRepo,
    getUserRepo,
    editUserAuthRepo,
    sut,
    data,
  };
};

describe('RefreshUserAuthTaskImpl', () => {
  it('Should throws if editUserAuthRepo throws', async () => {
    const { sut, editUserAuthRepo, data } = makeSut();
    jest.spyOn(editUserAuthRepo, 'edit').mockRejectedValue(new Error());
    await expect(sut.refresh(data)).rejects.toThrow();
  });

  it('Should return if edit userAuth', async () => {
    const { sut, data } = makeSut();
    await expect(sut.refresh(data)).resolves.toBeUndefined();
  });
});