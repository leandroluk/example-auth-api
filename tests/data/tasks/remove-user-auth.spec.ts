import { RemoveUserAuthTaskImpl } from '$/data/tasks/remove-user-auth';
import { RemoveUserAuthTask } from '$/presentation/protocols/remove-user-auth';
import { MockEditUserAuthRepo } from 'mocks/data/protocols/repos/edit-user-auth';

const makeSut = (): {
  editUserAuthRepo: MockEditUserAuthRepo;
  sut: RemoveUserAuthTaskImpl;
  id: RemoveUserAuthTask.Id;
} => {
  const editUserAuthRepo = new MockEditUserAuthRepo();
  const sut = new RemoveUserAuthTaskImpl(
    editUserAuthRepo
  );
  const id: RemoveUserAuthTask.Id = 'id';
  return {
    editUserAuthRepo,
    sut,
    id,
  };
};

describe('RemoveUserAuthTaskImpl', () => {
  it('Should throw if editUserAuthRepo throws', async () => {
    const { sut, editUserAuthRepo, id } = makeSut();
    jest.spyOn(editUserAuthRepo, 'edit').mockRejectedValue(new Error());
    await expect(sut.remove(id)).rejects.toThrow();
  });

  it('Should return if remove userAuth', async () => {
    const { sut, id } = makeSut();
    await expect(sut.remove(id)).resolves.toBeUndefined();
  });
});