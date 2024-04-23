type CamelCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : Lowercase<S>;

export type UncapitalizeObjectKeys<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Record<string, any>
    ? UncapitalizeObjectKeys<T[K]>
    : T[K];
};
