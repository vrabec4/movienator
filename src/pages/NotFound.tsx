import { Link } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import Button from '@mui/material/Button';

import {
  NotFoundCode,
  NotFoundContainer,
  NotFoundDescription,
  NotFoundTitle,
} from '../components/StyledComponents';

export function NotFound() {
  return (
    <NotFoundContainer maxWidth="lg">
      <NotFoundCode>404</NotFoundCode>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundDescription>
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable. Let's get you back to watching
        some movies!
      </NotFoundDescription>

      <Button
        variant="contained"
        component={Link}
        to="/"
        startIcon={<HomeIcon />}
        sx={{ mb: 2 }}
      >
        Back to Home
      </Button>

      <Button
        variant="outlined"
        component={Link}
        to="/favorites"
        startIcon={<LocalMoviesIcon />}
        sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}
      >
        Go to Favorites
      </Button>
    </NotFoundContainer>
  );
}
