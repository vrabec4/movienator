import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import type { APIErrorResponse, MovieSearchResponse } from '@types';

import { api } from '../../lib/api';

export const MOVIE_SEARCH_QUERY_KEY = 'movieSearch';

type UseMovieSearchQueryArg = {
  searchTerm: string;
  enabled?: boolean;
  page?: number;
};

export async function fetchMovieSearch({
  searchTerm,
  page = 1,
}: UseMovieSearchQueryArg): Promise<MovieSearchResponse> {
  const { data } = await api.get<MovieSearchResponse>('', {
    params: {
      s: searchTerm,
      page: page,
    },
  });

  if (data.Response === 'False') {
    throw new Error(data.Error);
  }

  return data;
}

export function useMovieSearchQuery({
  searchTerm,
  enabled = !!searchTerm,
}: UseMovieSearchQueryArg) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  return useQuery<MovieSearchResponse, APIErrorResponse>({
    queryKey: [MOVIE_SEARCH_QUERY_KEY, searchTerm, page],
    queryFn: () => fetchMovieSearch({ searchTerm, page }),
    enabled,
    staleTime: 3_600_000,
  });
}
