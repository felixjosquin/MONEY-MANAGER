export type NullableId<E extends { id: number }> = {
  [K in keyof E]: K extends "id" ? null | E[K] : E[K];
};
