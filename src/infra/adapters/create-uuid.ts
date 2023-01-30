import { CreateUuidAdapter } from '$/data/protocols/adapters/create-uuid';
import crypto from 'crypto';

export class CreateUuidAdapterImpl implements CreateUuidAdapter {
  async create(): Promise<CreateUuidAdapter.Result> {
    const uuid = crypto.randomUUID();
    return uuid;
  }
}
