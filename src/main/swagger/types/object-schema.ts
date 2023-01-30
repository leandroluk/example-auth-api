import { OpenAPIV3 } from 'openapi-types';
import { RequiredKeys } from './required-keys';

export type ObjectSchema<T extends {}> = OpenAPIV3.SchemaObject & {
  type: 'object',
  required: Array<RequiredKeys<T>>;
  properties: Record<keyof T, OpenAPIV3.SchemaObject>;
};