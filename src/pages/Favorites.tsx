import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import { MovieGrid } from '@/components/MovieGrid';
import { useFavoritesData } from '@/features/movies';
import { useToast } from '@/hooks';
import { Optional } from '@/types';

import { PageLoader } from '../components/Loaders';
import {
  EmptyState,
  FavoritesContainer,
  HeaderPaper,
} from '../components/StyledComponents';
import { Toast } from '../components/Toast';
import type { Movie } from '../types/movies';

export function Favorites() {
  const navigate = useNavigate();
  const { toast, showToast, closeToast } = useToast();
  const [selectedMovie, setSelectedMovie] = useState<Optional<Movie>>(null);

  const { favorites, isLoading, handleRemoveFavorite, handleMovieSelect } =
    useFavoritesData({
      showToast,
      navigate,
      setSelectedMovie,
    });

  if (isLoading) {
    return (
      <FavoritesContainer maxWidth="lg">
        <Typography variant="h5">Loading favorites...</Typography>
        <PageLoader />
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer maxWidth="lg">
      <HeaderPaper elevation={1}>
        <Typography variant="h4" component="h1">
          My Favorites
        </Typography>
      </HeaderPaper>

      {favorites.length === 0 ? (
        <EmptyState>
          <Typography variant="h5" gutterBottom>
            No favorite movies yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Start browsing and add movies to your favorites!
          </Typography>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography color="primary" variant="body1">
              Go to movie search
            </Typography>
          </Link>
        </EmptyState>
      ) : (
        <MovieGrid
          movies={favorites}
          selectedMovieId={selectedMovie?.imdbID}
          onMovieSelect={handleMovieSelect}
          showRemoveButtons={true}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
    </FavoritesContainer>
  );
}
