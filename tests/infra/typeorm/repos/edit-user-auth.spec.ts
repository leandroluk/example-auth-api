import { EditUserAuthRepoImpl } from '$/infra/typeorm/repos/edit-user-auth';

jest.mock('typeorm', () => {
  class DataSource {
    createQueryBuilder(): this { return this; }
    update(): this { return this; }
    set(): this { return this; }
    where(): this { return this; }
    execute(): this { return this; }
  }
  return {
    ...jest.requireActual('typeorm'),
    DataSource,
  };
});

const makeSut = (): {
  sut: EditUserAuthRepoImpl;
} => {
  const sut = new EditUserAuthRepoImpl();
  return {
    sut,
  };
};

describe('EditUserAuthRepoImpl', () => {
  it('Should return when success', async () => {
    const { sut } = makeSut();
    await expect(sut.edit({ id: 'id', changes: {} })).resolves.toBeUndefined();
  });
});