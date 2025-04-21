import { Link } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useMovieDetailData } from '@/features/movies/useMovieDetailData';
import { useToast } from '@/hooks';

import { PageLoader } from '../components/Loaders';
import {
  BackButton,
  DetailContainer,
  MovieDetailFavoriteButton as FavoriteButton,
  GenreChips,
  MetadataItem,
  MetadataLabel,
  MovieDetailPaper,
  SectionDivider,
  TitleContainer,
} from '../components/StyledComponents';
import { Toast } from '../components/Toast';

export function MovieDetail() {
  const {
    movie,
    isLoading,
    isError,
    errorMessage,
    imdbRatingOutOf5,
    isMovieFavorite,
    handleToggleFavorite,
  } = useMovieDetailData();
  const { toast, closeToast, showToast } = useToast();

  const handleFavoriteClick = () => {
    const result = handleToggleFavorite();
    if (result.success && result.title) {
      showToast(
        `${result.title} ${
          result.action === 'added' ? 'added to' : 'removed from'
        } favorites`,
        'success',
      );
    }
  };

  if (isLoading && !movie) {
    return (
      <DetailContainer maxWidth="lg">
        <Button
          variant="outlined"
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ color: 'white' }}
        >
          Back to Search
        </Button>
        <PageLoader />
      </DetailContainer>
    );
  }

  if (isError) {
    return (
      <DetailContainer maxWidth="lg">
        <BackButton
          variant="outlined"
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
        >
          Back to Search
        </BackButton>
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage ? errorMessage : 'Failed to load movie details'}
        </Alert>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer maxWidth="lg">
      <BackButton
        variant="outlined"
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
      >
        Back to Search
      </BackButton>
      <MovieDetailPaper>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <>
              {movie?.Poster && movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  style={{
                    width: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    minHeight: '300px',
                    backgroundImage: `url(${'../assets/no_preview.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              )}
            </>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <TitleContainer>
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  sx={{ flexGrow: 1 }}
                >
                  {movie?.Title}
                </Typography>
                <Tooltip
                  title={
                    isMovieFavorite
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                >
                  <FavoriteButton
                    onClick={handleFavoriteClick}
                    aria-label={
                      isMovieFavorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                    isFavorite={isMovieFavorite}
                  >
                    {isMovieFavorite ? (
                      <StarIcon fontSize="large" />
                    ) : (
                      <StarBorderIcon fontSize="large" />
                    )}
                  </FavoriteButton>
                </Tooltip>
              </TitleContainer>

              <Box
                sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Rating value={imdbRatingOutOf5} precision={0.1} readOnly />
                <Typography variant="body1" fontWeight="medium">
                  {movie?.imdbRating}/10
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({movie?.imdbVotes} votes)
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
                >
                  {movie?.Year && (
                    <Typography component="span">{movie.Year}</Typography>
                  )}
                  {movie?.Rated && (
                    <Typography component="span">• {movie.Rated}</Typography>
                  )}
                  {movie?.Runtime && (
                    <Typography component="span">• {movie.Runtime}</Typography>
                  )}
                </Typography>
              </Box>

              {movie?.Genre && (
                <GenreChips>
                  {movie.Genre.split(', ').map((genre) => (
                    <Chip
                      key={genre}
                      label={genre}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </GenreChips>
              )}

              {movie?.Plot && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" paragraph>
                    {movie.Plot}
                  </Typography>
                </Box>
              )}

              <SectionDivider />

              <Grid container spacing={2}>
                {movie?.Director && movie.Director !== 'N/A' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">
                        Director
                      </MetadataLabel>
                      <Typography variant="body1">{movie.Director}</Typography>
                    </MetadataItem>
                  </Grid>
                )}

                {movie?.Writer && movie.Writer !== 'N/A' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">Writer</MetadataLabel>
                      <Typography variant="body1">{movie.Writer}</Typography>
                    </MetadataItem>
                  </Grid>
                )}

                {movie?.Actors && movie.Actors !== 'N/A' && (
                  <Grid size={{ xs: 12 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">Cast</MetadataLabel>
                      <Typography variant="body1">{movie.Actors}</Typography>
                    </MetadataItem>
                  </Grid>
                )}
              </Grid>
              <SectionDivider />
              <Grid container spacing={2}>
                {movie?.Awards && movie.Awards !== 'N/A' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">Awards</MetadataLabel>
                      <Typography variant="body1">{movie.Awards}</Typography>
                    </MetadataItem>
                  </Grid>
                )}

                {movie?.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">
                        Box Office
                      </MetadataLabel>
                      <Typography variant="body1">{movie.BoxOffice}</Typography>
                    </MetadataItem>
                  </Grid>
                )}

                {movie?.Production && movie.Production !== 'N/A' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">
                        Production
                      </MetadataLabel>
                      <Typography variant="body1">
                        {movie.Production}
                      </Typography>
                    </MetadataItem>
                  </Grid>
                )}

                {movie?.Released && movie.Released !== 'N/A' && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <MetadataItem>
                      <MetadataLabel variant="subtitle2">
                        Release Date
                      </MetadataLabel>
                      <Typography variant="body1">{movie.Released}</Typography>
                    </MetadataItem>
                  </Grid>
                )}
              </Grid>

              {movie?.Ratings && movie.Ratings.length > 0 && (
                <>
                  <SectionDivider />
                  <Box>
                    <MetadataLabel variant="subtitle2">Ratings</MetadataLabel>
                    <Grid container spacing={2}>
                      {movie.Ratings.map((rating) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={rating.Source}>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {rating.Source}
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {rating.Value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </MovieDetailPaper>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={closeToast}
      />
    </DetailContainer>
  );
}
