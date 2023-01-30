import { CompareHashAdapter } from '$/data/protocols/adapters/compare-hash';
import crypto from 'crypto';

export class CompareHashAdapterImpl implements CompareHashAdapter {
  async compare(args: CompareHashAdapter.Args): Promise<CompareHashAdapter.Result> {
    const key = args.hashed.slice(0, 16);
    const toCompare = args.hashed.slice(16);
    const comparer = crypto.createHmac('sha256', key).update(args.plain).digest('hex');
    return comparer === toCompare;
  }
}