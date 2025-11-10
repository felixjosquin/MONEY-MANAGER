export type Prefixed<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}_${K & string}`]: T[K];
};

export type NullableFields<T> = {
  [K in keyof T]: T[K] | null;
};
