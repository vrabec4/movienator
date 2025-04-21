import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { MovieGrid } from '@/components/MovieGrid';
import { useMobileView, usePagination } from '@/hooks';

import { useMovieSearchData } from '@features/movies';

import {
  Logo,
  LogoContainer,
  PaginationContainer,
} from '@components/StyledComponents';

import { PageErrorLoader, PageLoader } from '../components/Loaders';

export function MovieSearch() {
  const isMobileViewActive = useMobileView();
  const { currentPage, setPage } = usePagination();

  const {
    movies,
    searchTerm,
    isLoading,
    hasError,
    errorMessage,
    isEmptySearch,
    handleMovieSelect,
    selectedMovie,
    totalResults,
    shouldShowLogo,
    totalPages,
  } = useMovieSearchData();

  if (hasError) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ pt: 4, pb: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Movie Search
          </Typography>
          <PageErrorLoader message={errorMessage} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 4, pb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Movie Search
        </Typography>
        {isLoading ? (
          <PageLoader />
        ) : isEmptySearch ? (
          <>
            <Box sx={{ py: 4, textAlign: 'left' }}>
              <Typography variant="body1">
                "I'll be back." Enter at least 3 characters to search for your
                favorite Terminator movies and beyond.
              </Typography>
            </Box>
            {shouldShowLogo && (
              <LogoContainer>
                <Logo
                  src="/src/assets/movienator-logo.svg"
                  alt="Movienator Logo"
                />
              </LogoContainer>
            )}
          </>
        ) : movies && movies.length > 0 ? (
          <Box>
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                Found {totalResults} results for "{searchTerm}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Page {currentPage} of {totalPages}
              </Typography>
            </Box>

            <MovieGrid
              movies={movies}
              selectedMovieId={selectedMovie?.imdbID}
              onMovieSelect={handleMovieSelect}
            />

            {totalPages > 1 && (
              <PaginationContainer>
                <Pagination
                  count={Math.min(totalPages, 100)}
                  page={currentPage}
                  onChange={(_event, value) => {
                    setPage(value);
                  }}
                  color="primary"
                  size={isMobileViewActive ? 'small' : 'medium'}
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      margin: { xs: '0 2px', sm: '0 4px' },
                    },
                  }}
                />
              </PaginationContainer>
            )}
          </Box>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Alert severity="info" sx={{ display: 'inline-flex' }}>
              No movies found. Try a different search term.
            </Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
}
