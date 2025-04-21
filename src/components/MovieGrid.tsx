import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

import { Movie } from '@types';

import {
  FavoriteButton,
  GridContainer,
  MovieCard,
  MovieInfoOverlay,
  MoviePoster,
  MovieTitle,
  MovieType,
  MovieYear,
  NoImage,
  RatingPill,
} from './StyledComponents';

type Props = {
  movies: Movie[];
  selectedMovieId?: string;
  onMovieSelect: (movie: Movie) => void;
  showRemoveButtons?: boolean;
  onRemoveFavorite?: (
    movieId: string,
    movieTitle: string,
    event: React.MouseEvent,
  ) => void;
};

export function MovieGrid({
  movies,
  selectedMovieId,
  onMovieSelect,
  showRemoveButtons = false,
  onRemoveFavorite,
}: Props) {
  return (
    <GridContainer>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          isSelected={selectedMovieId === movie.imdbID}
          onClick={() => onMovieSelect(movie)}
        >
          {movie.Type && <MovieType>{movie.Type}</MovieType>}

          {showRemoveButtons && onRemoveFavorite && (
            <FavoriteButton
              aria-label="Remove from favorites"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(movie.imdbID, movie.Title, e);
              }}
              size="small"
            >
              <StarIcon fontSize="small" />
            </FavoriteButton>
          )}

          {movie.Poster && movie.Poster !== 'N/A' ? (
            <MoviePoster
              sx={{
                backgroundImage: `url(${movie.Poster})`,
              }}
              title={movie.Title}
            />
          ) : (
            <NoImage
              sx={{
                backgroundImage: `url(${'../assets/no_preview.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}

          <MovieInfoOverlay className="movie-info-overlay">
            <MovieTitle variant="subtitle1" title={movie.Title}>
              {movie.Title}
            </MovieTitle>
            <MovieYear>{movie.Year}</MovieYear>

            {'imdbRating' in movie && typeof movie.imdbRating === 'string' && (
              <RatingPill>
                <StarIcon sx={{ fontSize: 16, color: 'gold', mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {movie.imdbRating}
                </Typography>
              </RatingPill>
            )}
          </MovieInfoOverlay>
        </MovieCard>
      ))}
    </GridContainer>
  );
}
