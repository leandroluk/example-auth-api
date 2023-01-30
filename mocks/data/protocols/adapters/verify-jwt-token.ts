import { VerifyJwtTokenAdapter } from '$/data/protocols/adapters/verify-jwt-token';

export class MockVerifyJwtTokenAdapter implements VerifyJwtTokenAdapter {
  constructor (
    public $verify: VerifyJwtTokenAdapter.Result = 'decoded'
  ) {}

  async verify(_token: VerifyJwtTokenAdapter.Token): Promise<VerifyJwtTokenAdapter.Result> {
    return this.$verify;
  }
}