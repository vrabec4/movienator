/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { api } from '../../../lib/api';
import {
  fetchMovieDetail,
  MOVIE_DETAIL_QUERY_KEY,
  useMovieDetailQuery,
} from '../useMovieDetailQuery';

vi.mock('../../../lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('useMovieDetailQuery', () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  // Mock movie data
  const mockMovieId = 'tt1234567';
  const mockMovieDetail = {
    imdbID: mockMovieId,
    Title: 'Test Movie',
    Year: '2023',
    Poster: 'https://example.com/poster.jpg',
    Type: 'movie',
    imdbRating: '8.5',
    Plot: 'A test movie plot',
    Director: 'Test Director',
    Actors: 'Actor 1, Actor 2',
    Genre: 'Action',
    Runtime: '120 min',
    Released: '2023-01-01',
    Response: 'True',
    Rated: 'PG-13',
    Writer: 'Test Writer',
    Language: 'English',
    Country: 'USA',
    Awards: 'None',
    Metascore: '75',
    DVD: '2023-02-01',
    BoxOffice: '$1,000,000',
    Production: 'Test Production',
    Website: 'https://example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    (api.get as any).mockResolvedValue({ data: {} });
  });

  describe('fetchMovieDetail', () => {
    it('should fetch movie details successfully', async () => {
      (api.get as any).mockResolvedValueOnce({ data: mockMovieDetail });

      const result = await fetchMovieDetail({ movieId: mockMovieId });

      expect(api.get).toHaveBeenCalledWith('', {
        params: {
          i: mockMovieId,
          plot: 'full',
        },
      });
      expect(result).toEqual(mockMovieDetail);
    });

    it('should throw an error when movie is not found', async () => {
      const errorResponse = { Response: 'False', Error: 'Movie not found!' };
      (api.get as any).mockResolvedValueOnce({ data: errorResponse });

      await expect(fetchMovieDetail({ movieId: 'invalid-id' })).rejects.toThrow(
        'Movie not found',
      );
    });
  });

  describe('useMovieDetailQuery', () => {
    it('should return movie details when query is successful', async () => {
      (api.get as any).mockResolvedValueOnce({ data: mockMovieDetail });

      const { result } = renderHook(
        () => useMovieDetailQuery({ movieId: mockMovieId }),
        { wrapper },
      );

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockMovieDetail);
    });

    it('should handle error when movie is not found', async () => {
      const errorResponse = { Response: 'False', Error: 'Movie not found!' };
      (api.get as any).mockResolvedValueOnce({ data: errorResponse });

      const { result } = renderHook(
        () => useMovieDetailQuery({ movieId: 'invalid-id' }),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error?.message).toBe('Movie not found');
    });

    it('should not run the query when enabled is false', async () => {
      const { result } = renderHook(
        () => useMovieDetailQuery({ movieId: mockMovieId, enabled: false }),
        { wrapper },
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetched).toBe(false);
      expect(api.get).not.toHaveBeenCalled();
    });

    it('should use the correct query key', async () => {
      (api.get as any).mockResolvedValueOnce({ data: mockMovieDetail });

      renderHook(() => useMovieDetailQuery({ movieId: mockMovieId }), {
        wrapper,
      });

      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((cache) => cache.queryKey);
      expect(queryKeys).toContainEqual([MOVIE_DETAIL_QUERY_KEY, mockMovieId]);
    });
  });
});
