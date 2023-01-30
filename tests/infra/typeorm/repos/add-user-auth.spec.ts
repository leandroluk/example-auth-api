import { AddUserAuthRepoImpl } from '$/infra/typeorm/repos/add-user-auth';
import { mockUserAuth } from 'mocks/domain/models/user-auth';

jest.mock('typeorm', () => {
  class DataSource {
    createQueryBuilder(): this { return this; }
    insert(): this { return this; }
    into(): this { return this; }
    values(): this { return this; }
    execute(): this { return this; }
  }
  return {
    ...jest.requireActual('typeorm'),
    DataSource,
  };
});

const makeSut = (): {
  sut: AddUserAuthRepoImpl;
} => {
  const sut = new AddUserAuthRepoImpl();
  return {
    sut,
  };
};

describe('AddUserAuthRepoImpl', () => {
  it('Should return when success', async () => {
    const { sut } = makeSut();
    await expect(sut.add(mockUserAuth)).resolves.toBeUndefined();
  });
});