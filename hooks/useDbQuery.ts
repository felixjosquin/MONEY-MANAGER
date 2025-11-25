import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

type useDbQueryOption<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends readonly unknown[]
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryFn"> & {
  queryFn: (db: SQLiteDatabase) => Promise<TQueryFnData>;
};

export function useDbQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = []
>(
  options: useDbQueryOption<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  const db = useSQLiteContext();

  return useQuery({
    ...options,
    queryFn: () => options.queryFn(db),
  });
}
