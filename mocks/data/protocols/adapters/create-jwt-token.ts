import { CreateJwtTokenAdapter } from '$/data/protocols/adapters/create-jwt-token';

export class MockCreateJwtTokenAdapter implements CreateJwtTokenAdapter {
  constructor (
    public $create: CreateJwtTokenAdapter.Result = 'jwtToken'
  ) {}

  async create(_data: CreateJwtTokenAdapter.Data): Promise<CreateJwtTokenAdapter.Result> {
    return this.$create;
  }
}