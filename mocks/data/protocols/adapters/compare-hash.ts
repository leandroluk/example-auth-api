import { CompareHashAdapter } from '$/data/protocols/adapters/compare-hash';

export class MockCompareHashAdapter implements CompareHashAdapter {
  constructor (
    public $compare: CompareHashAdapter.Result = true
  ) {}

  async compare(_args: CompareHashAdapter.Args): Promise<CompareHashAdapter.Result> {
    return this.$compare;
  }
}