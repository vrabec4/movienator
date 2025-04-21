import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { Movie, Optional } from '@types';

import { useMovieSearchQuery } from './useMovieSearchQuery';

type UseMovieSearchPageData = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  isEmptySearch: boolean;
  movies?: Movie[];
  totalResults?: string;
  selectedMovie: Optional<Movie>;
  searchTerm: string;
  shouldShowLogo: boolean;
  totalPages: number;
};

const defaultPageData: UseMovieSearchPageData = {
  isLoading: false,
  hasError: false,
  errorMessage: undefined,
  isEmptySearch: true,
  movies: undefined,
  totalResults: undefined,
  selectedMovie: null,
  searchTerm: '',
  shouldShowLogo: true,
  totalPages: 0,
};

type MovieSearchPageActions = {
  setSearchTerm: (term: string) => void;
  handleMovieSelect: (movie: Optional<Movie>) => void;
};

type UseMovieSearchDataAPI = UseMovieSearchPageData & MovieSearchPageActions;

export function useMovieSearchData(): UseMovieSearchDataAPI {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromParams = searchParams.get('q') || '';
  const movieIdFromParams = searchParams.get('movie') || '';

  const [searchTerm, setSearchTermState] =
    useState<string>(searchTermFromParams);
  const [selectedMovie, setSelectedMovie] = useState<Optional<Movie>>(null);

  const { data, isLoading, error, isError } = useMovieSearchQuery({
    searchTerm,
    enabled: searchTerm.length >= 3,
  });

  const setSearchTerm = useCallback(
    (term: string) => {
      setSearchTermState(term);
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (term) {
          newParams.set('q', term);
        } else {
          newParams.delete('q');
        }
        return newParams;
      });
    },
    [setSearchParams],
  );

  const handleMovieSelect = useCallback(
    (movie: Optional<Movie>) => {
      setSelectedMovie(movie);
      if (movie) {
        navigate(`/movie/${movie.imdbID}`);
      }
    },
    [navigate],
  );

  useEffect(
    function syncSelectedMovieWithUrlParams() {
      if (movieIdFromParams && data?.Response === 'True') {
        const foundMovie = data.Search.find(
          (movie) => movie.imdbID === movieIdFromParams,
        );
        setSelectedMovie(foundMovie || null);
      } else if (!movieIdFromParams) {
        setSelectedMovie(null);
      }
    },
    [data, movieIdFromParams],
  );

  useEffect(
    function syncSearchTermWithUrlParams() {
      if (searchTermFromParams && searchTermFromParams !== searchTerm) {
        setSearchTermState(searchTermFromParams);
      }
    },
    [searchTermFromParams, searchTerm],
  );

  const pageData = useMemo<UseMovieSearchPageData>(() => {
    const isLoadingAnything = isLoading;
    const hasAnyError = isError || data?.Response === 'False';
    const errorMsg = isError
      ? error instanceof Error
        ? error.message
        : 'An unknown error occurred'
      : data?.Response === 'False'
        ? data.Error
        : undefined;

    const totalPages =
      data?.Response === 'True' && data.totalResults
        ? Math.ceil(Number.parseInt(data.totalResults, 10) / 10)
        : 0;

    const shouldShowLogo = searchTerm.length < 3 && !isLoadingAnything;

    if (isLoadingAnything) {
      return {
        ...defaultPageData,
        isLoading: true,
        searchTerm,
        selectedMovie,
        isEmptySearch: searchTerm.length < 3,
        shouldShowLogo: false,
        totalPages,
      };
    }

    if (hasAnyError) {
      return {
        ...defaultPageData,
        hasError: true,
        errorMessage: errorMsg,
        searchTerm,
        selectedMovie,
        isEmptySearch: searchTerm.length < 3,
        shouldShowLogo,
        totalPages,
      };
    }

    if (searchTerm.length < 3) {
      return {
        ...defaultPageData,
        isEmptySearch: true,
        searchTerm,
        selectedMovie,
        shouldShowLogo,
        totalPages,
      };
    }

    if (data?.Search) {
      return {
        ...defaultPageData,
        movies: data.Search,
        totalResults: data.totalResults,
        isEmptySearch: false,
        searchTerm,
        selectedMovie,
        shouldShowLogo: false,
        totalPages,
      };
    }

    return {
      ...defaultPageData,
      searchTerm,
      selectedMovie,
      isEmptySearch: searchTerm.length < 3,
      shouldShowLogo,
      totalPages,
    };
  }, [isLoading, isError, error, data, searchTerm, selectedMovie]);

  const api = useMemo<UseMovieSearchDataAPI>(() => {
    return {
      ...pageData,
      setSearchTerm,
      handleMovieSelect,
    };
  }, [pageData, setSearchTerm, handleMovieSelect]);

  return api;
}
