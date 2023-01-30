import { Indexable } from '$/domain/generics/indexable';
import { Search } from '$/domain/generics/search';
import { EntityTarget, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { typeormDataSource } from './data-source';

type OperatorFn = (field: string, value: any) => [string, ObjectLiteral];

export const typeormHelper = {
  operatorsMap: {
    eq: (field, value) => [`(x.${field} = :${field})`, { [field]: value }],
    gt: (field, value) => [`(x.${field} > :${field})`, { [field]: value }],
    gte: (field, value) => [`(x.${field} >= :${field})`, { [field]: value }],
    lt: (field, value) => [`(x.${field} < :${field})`, { [field]: value }],
    lte: (field, value) => [`(x.${field} <= :${field})`, { [field]: value }],
    in: (field, value) => [`(x.${field} IN :${field})`, { [field]: value }],
    like: (field, value) => [`(x.${field} ILIKE :${field})`, { [field]: `%${value as string}%` }],
    neq: (field, value) => [`(NOT (x.${field} = :${field}))`, { [field]: value }],
    ngt: (field, value) => [`(NOT (x.${field} > :${field}))`, { [field]: value }],
    ngte: (field, value) => [`(NOT (x.${field} >= :${field}))`, { [field]: value }],
    nlt: (field, value) => [`(NOT (x.${field} < :${field}))`, { [field]: value }],
    nlte: (field, value) => [`(NOT (x.${field} <= :${field}))`, { [field]: value }],
    nin: (field, value) => [`(NOT (x.${field} IN :${field}))`, { [field]: value }],
    nlike: (field, value) => [`(NOT (x.${field} ILIKE :${field}))`, { [field]: `%${value as string}%` }],
  } satisfies Record<Search.Operators, OperatorFn>,

  searchQuery2Builder<T extends Indexable>(
    entity: EntityTarget<T>,
    query: Search.Query<T>,
    availableFields?: Array<string & keyof T>,
    fullTextFields?: Partial<Array<string & keyof T>>
  ): SelectQueryBuilder<T> {
    if (!availableFields) availableFields = typeormHelper.getAvailableFields(entity);
    if (!fullTextFields) fullTextFields = typeormHelper.getFullTextFields(entity);

    let fields: string[] = availableFields;

    if (query.fields?.select) {
      fields = query.fields.select;
    } else if (query.fields?.remove) {
      fields = availableFields.filter(field => !query.fields.remove.includes(field));
    }

    let builder = typeormDataSource
      .createQueryBuilder()
      .from(entity, 'x')
      .select(fields.map(field => `x.${field}`))
      .where('1 = 1');

    if (query.text) {
      // see: https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/
      const matcher = fullTextFields
        .map(field => [
          `x.${field} ILIKE :perc`,
          `SOUNDEX(x.${field}), SOUNDEX(:raw) > 4`,
          `LEVENSHTEIN(LOWER(x.${field}), LOWER(:raw)) < 4`,
        ]).flatMap(inner => inner).join(' OR ');
      builder = builder.andWhere(`(${matcher})`, { raw: query.text, perc: `%${query.text}%` });
    }

    if (query.where) {
      Object.entries(query.where).forEach(([field, condition]) => {
        Object.entries(condition).forEach(([op, value]) => {
          const [text, parameter] = typeormHelper.operatorsMap[op](field, value, 'x');
          builder = builder.andWhere(text, parameter);
        });
      });
    }

    if (query.sort) {
      builder = builder.orderBy('1');
      Object.entries(query.sort).forEach(([field, value]) => {
        builder = builder.addOrderBy(field, value === 1 ? 'ASC' : 'DESC');
      });
    }

    return builder;
  },

  getAvailableFields<T extends Indexable>(
    entity: EntityTarget<T>
  ): Array<string & keyof T> {
    const { columns } = typeormDataSource.getMetadata(entity);
    return columns.map(column => column.propertyName) as Array<string & keyof T>;
  },

  getFullTextFields<T extends Indexable>(
    entity: EntityTarget<T>
  ): Partial<Array<string & keyof T>> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    return (entity as any).fullTextFields ?? [];
  },
};
