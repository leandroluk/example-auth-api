import { CreateUuidAdapterImpl } from '$/infra/adapters/create-uuid';

jest.mock('crypto', () => ({
  randomUUID: () => 'uuid',
}));

const makeSut = (): {
  sut: CreateUuidAdapterImpl;
} => {
  const sut = new CreateUuidAdapterImpl();
  return {
    sut,
  };
};

describe('CreateUuidAdapterImpl', () => {
  it('Should return new uuid', async () => {
    const { sut } = makeSut();
    await expect(sut.create()).resolves.toBe('uuid');
  });
});
