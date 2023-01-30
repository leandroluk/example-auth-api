import { Indexable } from '$/domain/generics/indexable';
import { Search } from '$/domain/generics/search';
import { typeormDataSource } from '$/infra/typeorm/data-source';
import { FullTextFields } from '$/infra/typeorm/decorators';
import { typeormHelper } from '$/infra/typeorm/helper';
import { SelectQueryBuilder } from 'typeorm';

describe('typeormHelper', () => {
  describe('operatorsMap', () => {
    it.each([
      ['eq', ['(x.field = :field)', { field: 'a' }]],
      ['gt', ['(x.field > :field)', { field: 'a' }]],
      ['gte', ['(x.field >= :field)', { field: 'a' }]],
      ['lt', ['(x.field < :field)', { field: 'a' }]],
      ['lte', ['(x.field <= :field)', { field: 'a' }]],
      ['in', ['(x.field IN :field)', { field: 'a' }]],
      ['like', ['(x.field ILIKE :field)', { field: '%a%' }]],
      ['neq', ['(NOT (x.field = :field))', { field: 'a' }]],
      ['ngt', ['(NOT (x.field > :field))', { field: 'a' }]],
      ['ngte', ['(NOT (x.field >= :field))', { field: 'a' }]],
      ['nlt', ['(NOT (x.field < :field))', { field: 'a' }]],
      ['nlte', ['(NOT (x.field <= :field))', { field: 'a' }]],
      ['nin', ['(NOT (x.field IN :field))', { field: 'a' }]],
      ['nlike', ['(NOT (x.field ILIKE :field))', { field: '%a%' }]],
    ])('Should map operatorsMap.%s to correct structure', (fn, expected) => {
      const result = typeormHelper.operatorsMap[fn]('field', 'a');
      expect(result).toMatchObject(expected);
    });
  });

  describe('searchQuery2Builder', () => {
    type Test = Indexable & { field: string; };

    @FullTextFields(['id'])
    class TestEntity implements Test { id: string; field: string; };

    const makeSut = (): {
      builder: SelectQueryBuilder<Indexable>;
      availableFields: Array<keyof Test>;
      fullTextFields: Partial<Array<keyof Test>>;
    } => {
      const builder = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
      } as any;
      const availableFields: Array<keyof Test> = ['id', 'field'];
      const fullTextFields: Partial<Array<keyof Test>> = ['field'];

      jest.spyOn(typeormDataSource, 'createQueryBuilder')
        .mockReturnValueOnce(builder);

      return {
        builder,
        availableFields,
        fullTextFields,
      };
    };


    it('Should get availableFields and fullTextFields from entity when no passed', () => {
      makeSut();

      const getAvailableFieldsSpy = jest
        .spyOn(typeormHelper, 'getAvailableFields')
        .mockReturnValueOnce([] as any);

      const getFullTextFieldsSpy = jest
        .spyOn(typeormHelper, 'getFullTextFields')
        .mockReturnValueOnce([]);

      typeormHelper.searchQuery2Builder(TestEntity, {});

      expect(getAvailableFieldsSpy).toBeCalled();
      expect(getFullTextFieldsSpy).toBeCalled();
    });

    it('Should use query.fields.select', async () => {
      const { builder, availableFields, fullTextFields } = makeSut();
      const query: Search.Query<Test> = { fields: { select: ['id'] } };
      typeormHelper.searchQuery2Builder(TestEntity, query, availableFields, fullTextFields);
      expect(builder.select).toHaveBeenCalledWith(['x.id']);
    });

    it('Should use query.fields.remove', async () => {
      const { builder, availableFields, fullTextFields } = makeSut();
      const query: Search.Query<Test> = { fields: { remove: ['id'] } };
      const expected = ['x.field'];
      typeormHelper.searchQuery2Builder(TestEntity, query, availableFields, fullTextFields);
      expect(builder.select).toHaveBeenCalledWith(expected);
    });

    it('Should use query.text', async () => {
      const { builder, availableFields, fullTextFields } = makeSut();
      const query: Search.Query<Test> = { text: 'text' };
      const matchers = [
        'x.field ILIKE :perc',
        'SOUNDEX(x.field), SOUNDEX(:raw) > 4',
        'LEVENSHTEIN(LOWER(x.field), LOWER(:raw)) < 4',
      ];
      typeormHelper.searchQuery2Builder(TestEntity, query, availableFields, fullTextFields);
      expect(builder.andWhere).toHaveBeenCalledWith(
        `(${matchers.join(' OR ')})`,
        { raw: query.text, perc: `%${query.text}%` }
      );
    });

    it('Should use query.where', async () => {
      const { builder, availableFields, fullTextFields } = makeSut();
      const query: Search.Query<Test> = { where: { field: { eq: 'value' } } };
      typeormHelper.searchQuery2Builder(TestEntity, query, availableFields, fullTextFields);
      expect(builder.andWhere).toHaveBeenCalledWith('(x.field = :field)', { field: 'value' });
    });

    it('Should use query.sort', async () => {
      const { builder, availableFields, fullTextFields } = makeSut();
      const query: Search.Query<Test> = { sort: { id: -1, field: 1 } };
      typeormHelper.searchQuery2Builder(TestEntity, query, availableFields, fullTextFields);
      expect(builder.addOrderBy).toHaveBeenCalledWith('id', 'DESC');
      expect(builder.addOrderBy).toHaveBeenCalledWith('field', 'ASC');
    });
  });

  describe('getAvailableFields', () => {
    it('Should return list of existing coluns in declared Entity class', () => {
      const metadata: any = { columns: [{ propertyName: 'id' }] };
      jest.spyOn(typeormDataSource, 'getMetadata')
        .mockReturnValueOnce(metadata);
      const fields = typeormHelper.getAvailableFields({} as any);
      expect(fields).toMatchObject(['id']);
    });
  });

  describe('getFullTextFields', () => {
    it('Should return empty object when fullTextFields not declared', () => {
      class NoFullText { id: string; }
      const result = typeormHelper.getFullTextFields(NoFullText);
      expect(result).not.toMatchObject(['id']);
    });

    it('Should return declared fullTextFields', () => {
      class WithFullText { static fullTextFields = ['id']; id: string; }
      const result = typeormHelper.getFullTextFields(WithFullText);
      expect(result).toMatchObject(['id']);
    });
  });
});