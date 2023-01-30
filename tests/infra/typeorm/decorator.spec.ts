import { FullTextFields } from '$/infra/typeorm/decorators';

describe('FullTextFields', () => {
  it('Should add fullTextFields static property', () => {
    const fullTextFields: Array<keyof Test> = ['id'];

    @FullTextFields<Test>(fullTextFields)
    class Test { id: string; }

    expect((Test as any).fullTextFields).toMatchObject(fullTextFields);
  });
});