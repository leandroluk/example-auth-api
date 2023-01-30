import { typeormHelper } from '$/infra/typeorm/helper';
import { GetUserAuthRepoImpl } from '$/infra/typeorm/repos/get-user-auth';

const makeSut = (): {
  sut: GetUserAuthRepoImpl;
} => {
  const sut = new GetUserAuthRepoImpl();

  jest
    .spyOn(typeormHelper, 'searchQuery2Builder')
    .mockReturnValueOnce({ getOne: () => ({}) } as any);

  return {
    sut,
  };
};

describe('GetUserAuthRepoImpl', () => {
  it('Should return found object', async () => {
    const { sut } = makeSut();
    await expect(sut.get({ id: { eq: 'a' } })).resolves.toBeDefined();
  });
});