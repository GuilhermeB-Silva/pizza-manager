import { QueryClient } from "@tanstack/react-query";

type UpdateItemFn<T> = (oldItem: T, updatedItem: T) => T;

export function updateLastListQueryItem<T>(
  queryClient: QueryClient,
  queryKeyPrefix: string[],
  updatedItem: T,
  matchFn: (item: T) => boolean,
  updateFn?: UpdateItemFn<T>
) {
  const queries = queryClient
    .getQueryCache()
    .findAll({ queryKey: queryKeyPrefix, exact: false });

  const lastQuery = queries.at(-1);
  if (!lastQuery) return;

  const lastQueryKey = lastQuery.queryKey;

  queryClient.setQueryData(lastQueryKey, (old: any) => {
    if (!old?.data) return old;

    const updater = updateFn ?? ((_, updated) => updated);

    return {
      ...old,
      data: old.data.map((item: T) =>
        matchFn(item) ? updater(item, updatedItem) : item
      ),
    };
  });
}

export function refetchLastListQuery(
  queryClient: QueryClient,
  queryKeyPrefix: string[]
) {
  const queries = queryClient
    .getQueryCache()
    .findAll({ queryKey: queryKeyPrefix, exact: false });

  const lastQuery = queries.at(-1);
  if (!lastQuery) return;

  queryClient.invalidateQueries({
    queryKey: lastQuery.queryKey,
    exact: true,
  });
}

export function refetchFirstListQuery(
  queryClient: QueryClient,
  queryKeyPrefix: string[],
  firstQuerySuffix: unknown[] = [1]
) {
  const firstQueryKey = [...queryKeyPrefix, ...firstQuerySuffix];

  // Remove todas as queries do cache
  queryClient.removeQueries({ queryKey: queryKeyPrefix, exact: true });
}
