import { typeormHelper } from '$/infra/typeorm/helper';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user';

const makeSut = (): {
  sut: GetUserRepoImpl;
} => {
  const sut = new GetUserRepoImpl();

  jest
    .spyOn(typeormHelper, 'searchQuery2Builder')
    .mockReturnValueOnce({ getOne: () => ({}) } as any);

  return {
    sut,
  };
};

describe('GetUserRepoImpl', () => {
  it('Should return found object', async () => {
    const { sut } = makeSut();
    await expect(sut.get({ id: { eq: 'a' } })).resolves.toBeDefined();
  });
});