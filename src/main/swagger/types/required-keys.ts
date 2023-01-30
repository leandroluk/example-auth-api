export type RequiredKeys<T> = keyof {
  [K in keyof T as string extends K ? never : {} extends Pick<T, K> ? never : K]: 0
};
