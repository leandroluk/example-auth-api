
export function FullTextFields<T>(
  fullTextFields: Partial<Array<string & keyof T>>
): ClassDecorator {
  return function (cls: Function) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (cls as any).fullTextFields = fullTextFields;
  };
}