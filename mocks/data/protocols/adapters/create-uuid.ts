import { CreateUuidAdapter } from '$/data/protocols/adapters/create-uuid';

export class MockCreateUuidAdapter implements CreateUuidAdapter {
  constructor (
    public $create: CreateUuidAdapter.Result = 'uuid'
  ) {}

  async create(): Promise<CreateUuidAdapter.Result> {
    return this.$create;
  }
}