import { useQuery } from '@tanstack/react-query';

import type { APIErrorResponse, MovieDetail } from '@types';

import { api } from '../../lib/api';

export const MOVIE_DETAIL_QUERY_KEY = 'movieDetail';

type UseMovieDetailQueryArg = {
  movieId: string;
  enabled?: boolean;
};

export async function fetchMovieDetail({
  movieId,
}: UseMovieDetailQueryArg): Promise<MovieDetail> {
  const { data } = await api.get<MovieDetail>('', {
    params: {
      i: movieId,
      plot: 'full',
    },
  });

  if (data.Response === 'False') {
    throw new Error('Movie not found');
  }

  return data;
}

export function useMovieDetailQuery({
  movieId,
  enabled = !!movieId,
}: UseMovieDetailQueryArg) {
  return useQuery<MovieDetail, APIErrorResponse>({
    queryKey: [MOVIE_DETAIL_QUERY_KEY, movieId],
    queryFn: () => fetchMovieDetail({ movieId }),
    enabled,
    staleTime: 3_600_000,
  });
}
