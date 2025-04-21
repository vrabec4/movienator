import { NavigateFunction } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Optional } from '@/types';

import type { FavoriteMovie, Movie, MovieDetail } from '../../types';

export const FAVORITES_QUERY_KEY = 'favorites';

type ToastFunction = (
  message: string,
  severity: 'success' | 'error' | 'info' | 'warning',
) => void;

const getInitialFavorites = (): FavoriteMovie[] => {
  try {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      return JSON.parse(storedFavorites);
    }
  } catch (error) {
    console.error('Failed to parse favorites:', error);
  }
  return [];
};

export function useFavoritesData(options?: {
  showToast?: ToastFunction;
  navigate?: NavigateFunction;
  setSelectedMovie?: React.Dispatch<React.SetStateAction<Optional<Movie>>>;
}) {
  const queryClient = useQueryClient();
  const { showToast, navigate, setSelectedMovie } = options || {};

  const { data: favorites = [] } = useQuery({
    queryKey: [FAVORITES_QUERY_KEY],
    queryFn: getInitialFavorites,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (newFavorites: FavoriteMovie[]) => {
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      return Promise.resolve(newFavorites);
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData([FAVORITES_QUERY_KEY], newFavorites);
    },
  });

  const isFavorite = (movieId: string) =>
    favorites.some((fav) => fav.imdbID === movieId);

  const addFavorite = (movie: MovieDetail | Movie) => {
    const favoriteMovie: FavoriteMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type,
      imdbRating: 'imdbRating' in movie ? movie.imdbRating : 'N/A',
    };

    if (isFavorite(movie.imdbID)) {
      return true;
    }

    const newFavorites = [...favorites, favoriteMovie];
    mutation.mutate(newFavorites);
    return true;
  };

  const removeFavorite = (movieId: string) => {
    const newFavorites = favorites.filter((movie) => movie.imdbID !== movieId);
    mutation.mutate(newFavorites);
    return true;
  };

  const handleRemoveFavorite = (
    movieId: string,
    movieTitle: string,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const success = removeFavorite(movieId);
    if (success && showToast) {
      showToast(`${movieTitle} removed from favorites`, 'success');
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    if (setSelectedMovie) {
      setSelectedMovie(movie);
    }
    if (navigate) {
      navigate(`/movie/${movie.imdbID}`);
    }
  };

  const toggleFavorite = (movie: MovieDetail | Movie) => {
    const isCurrentlyFavorite = isFavorite(movie.imdbID);

    if (isCurrentlyFavorite) {
      return {
        success: removeFavorite(movie.imdbID),
        action: 'removed' as const,
      };
    } else {
      return {
        success: addFavorite(movie),
        action: 'added' as const,
      };
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    handleRemoveFavorite,
    handleMovieSelect,
    isLoading: mutation.isPending,
  };
}
