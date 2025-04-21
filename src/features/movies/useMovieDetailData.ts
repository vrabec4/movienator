import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { calculateImdbRatingOutOf5 } from '@/lib/utils';

import type { MovieDetail } from '@types';

import { useFavoritesData } from './useFavoritesData';
import { useMovieDetailQuery } from './useMovieDetailQuery';

type UseMovieDetailPageData = {
  movie?: MovieDetail;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  imdbRatingOutOf5: number;
  isMovieFavorite: boolean;
};

const defaultPageData: UseMovieDetailPageData = {
  movie: undefined,
  isLoading: false,
  isError: false,
  errorMessage: undefined,
  imdbRatingOutOf5: 0,
  isMovieFavorite: false,
};

type ToggleResult = {
  success: boolean;
  action?: 'added' | 'removed';
  title?: string;
};

type MovieDetailPageActions = {
  handleToggleFavorite: () => ToggleResult;
};

type UseMovieDetailDataAPI = UseMovieDetailPageData & MovieDetailPageActions;

export function useMovieDetailData(): UseMovieDetailDataAPI {
  const { id } = useParams<{ id: string }>();

  const {
    data: movie,
    isLoading,
    error,
    isError: queryIsError,
  } = useMovieDetailQuery({
    movieId: id || '',
  });

  const { isFavorite, toggleFavorite } = useFavoritesData();

  const handleToggleFavorite = useCallback(() => {
    if (!movie) return { success: false };

    const result = toggleFavorite(movie);

    return {
      success: result.success,
      action: result.action,
      title: movie.Title,
    };
  }, [movie, toggleFavorite]);

  const pageData = useMemo<UseMovieDetailPageData>(() => {
    const isLoadingAnything = isLoading;
    const hasAnyError = queryIsError;
    const errorMsg = queryIsError
      ? error instanceof Error
        ? error.message
        : 'An unknown error occurred'
      : undefined;

    const imdbRatingOutOf5 = calculateImdbRatingOutOf5(movie);

    const isMovieFavorite = movie ? isFavorite(movie.imdbID) : false;

    if (isLoadingAnything && !movie) {
      return {
        ...defaultPageData,
        isLoading: true,
      };
    }

    if (hasAnyError) {
      return {
        ...defaultPageData,
        isError: true,
        errorMessage: errorMsg,
      };
    }

    return {
      ...defaultPageData,
      movie,
      isLoading: isLoadingAnything,
      imdbRatingOutOf5,
      isMovieFavorite,
    };
  }, [isLoading, queryIsError, error, movie, isFavorite]);

  const api = useMemo<UseMovieDetailDataAPI>(() => {
    return {
      ...pageData,
      handleToggleFavorite,
    };
  }, [pageData, handleToggleFavorite]);

  return api;
}
