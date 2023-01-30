import { UnauthorizedError } from '$/data/errors/unauthorized';
import { CheckUserPasswordTaskImpl } from '$/data/tasks/check-user-password';
import { CheckUserPasswordTask } from '$/presentation/protocols/check-user-password';
import { MockCompareHashAdapter } from 'mocks/data/protocols/adapters/compare-hash';

const makeSut = (): {
  compareHashAdapter: MockCompareHashAdapter;
  sut: CheckUserPasswordTaskImpl;
  args: CheckUserPasswordTask.Args;
} => {
  const compareHashAdapter = new MockCompareHashAdapter();
  const sut = new CheckUserPasswordTaskImpl(
    compareHashAdapter,
    new UnauthorizedError()
  );
  const args: CheckUserPasswordTask.Args = {
    hashed: 'hashed',
    plain: 'plain',
  };
  return {
    compareHashAdapter,
    sut,
    args,
  };
};

describe('CheckUserPasswordTaskImpl', () => {
  it('Should throw if compareHashAdapter throws', async () => {
    const { sut, compareHashAdapter, args } = makeSut();
    jest.spyOn(compareHashAdapter, 'compare').mockRejectedValue(new Error());
    await expect(sut.check(args)).rejects.toThrow();
  });

  it('Should throw UnauthorizedError if compareHashAdapter returns falsy', async () => {
    const { sut, compareHashAdapter, args } = makeSut();
    compareHashAdapter.$compare = false;
    await expect(sut.check(args)).rejects.toThrow(UnauthorizedError);
  });

  it('Should return if passwords is same', async () => {
    const { sut, args } = makeSut();
    await expect(sut.check(args)).resolves.toBeUndefined();
  });
});