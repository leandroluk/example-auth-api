import { CompareHashAdapterImpl } from '$/infra/adapters/compare-hash';

jest.mock('crypto', () => ({
  createHmac: () => ({
    update: () => ({
      digest: () => 'digest',
    }),
  }),
}));

const makeSut = (): {
  sut: CompareHashAdapterImpl;
} => {
  const sut = new CompareHashAdapterImpl();
  return {
    sut,
  };
};

describe('CompareHashAdapterImpl', () => {
  it('Should return false when no plain no match with hashed', async () => {
    const { sut } = makeSut();
    const data = { plain: 'plain', hashed: '' };
    await expect(sut.compare(data)).resolves.toBeFalsy();
  });

  it('Should return true when plain matches with hashed', async () => {
    const { sut } = makeSut();
    const data = { plain: 'digest', hashed: `${''.padStart(16, 'a')}digest` };
    await expect(sut.compare(data)).resolves.toBeTruthy();
  });
});