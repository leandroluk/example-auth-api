import { AddUserAuthTaskImpl } from '$/data/tasks/add-user-auth';
import { AddUserAuthTask } from '$/presentation/protocols/add-user-auth';
import { MockCreateUuidAdapter } from 'mocks/data/protocols/adapters/create-uuid';
import { MockAddUserAuthRepo } from 'mocks/data/protocols/repos/add-user-auth';

const makeSut = (): {
  createUuidAdapter: MockCreateUuidAdapter;
  addUserAuthRepo: MockAddUserAuthRepo;
  sut: AddUserAuthTaskImpl;
  data: AddUserAuthTask.Data;
} => {
  const createUuidAdapter = new MockCreateUuidAdapter();
  const addUserAuthRepo = new MockAddUserAuthRepo();
  const sut = new AddUserAuthTaskImpl(
    createUuidAdapter,
    addUserAuthRepo
  );
  const data: AddUserAuthTask.Data = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userId: 'userId',
  };
  return {
    createUuidAdapter,
    addUserAuthRepo,
    sut,
    data,
  };
};

describe('AddUserAuthTaskImpl', () => {
  it('Should throw when createUuidAdapter throws', async () => {
    const { sut, createUuidAdapter, data } = makeSut();
    jest.spyOn(createUuidAdapter, 'create').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should throw when addUserAuthRepo throws', async () => {
    const { sut, addUserAuthRepo, data } = makeSut();
    jest.spyOn(addUserAuthRepo, 'add').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should add userAuth and return', async () => {
    const { sut, createUuidAdapter, data } = makeSut();
    const result = await sut.add(data);
    expect(result.id).toBe(createUuidAdapter.$create);
    expect(result.timestamp).toBeDefined();
    expect(result.created).toBeDefined();
    expect(result.removed).not.toBeDefined();
    expect(result.userId).toBe(data.userId);
    expect(result.accessToken).toBe(data.accessToken);
    expect(result.refreshToken).toBe(data.refreshToken);
  });
});