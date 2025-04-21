import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Query error:', error);
    },
  }),
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'movienator-cache',
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
