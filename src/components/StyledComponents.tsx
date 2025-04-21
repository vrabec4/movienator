import {
  alpha,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  styled,
  Typography,
} from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9,
  },
  borderRadius: 0,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
  minWidth: 'fit-content',
  padding: theme.spacing(0, 2),
}));

export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean; component?: React.ElementType; to?: string }>(
  ({ theme, active }) => ({
    color: active
      ? theme.palette.common.white
      : alpha(theme.palette.common.white, 0.7),
    backgroundColor: 'transparent',
    marginRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.common.white,
    },
    padding: theme.spacing(1, 1.5),
    fontSize: '1rem',
    fontWeight: active ? 700 : 400,
    textTransform: 'none',
  }),
);

export const MovienatorLogo = styled(Typography)<{
  component?: React.ElementType;
  to?: string;
}>(({ theme }) => ({
  fontWeight: 900,
  fontSize: '1.8rem',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  letterSpacing: '-0.5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

// Movie Grid Components
export const MovieCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05)',
    zIndex: 10,
    '& .movie-info-overlay': {
      opacity: 1,
    },
  },
  ...(isSelected && {
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[8],
  }),
}));

export const MoviePoster = styled(CardMedia)(() => ({
  height: 0,
  paddingTop: '150%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
}));

export const NoImage = styled(Box)(({ theme }) => ({
  height: 0,
  paddingTop: '150%',
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  position: 'relative',
}));

export const NoImageText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: theme.palette.common.white,
}));

export const MovieInfoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background:
    'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
  color: theme.palette.common.white,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  height: '100%',
}));

export const MovieTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
  lineHeight: 1.3,
  textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
}));

export const MovieYear = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: alpha(theme.palette.common.white, 0.8),
}));

export const MovieType = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: theme.spacing(0.5, 1),
  borderRadius: 4,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '0.5px',
  zIndex: 1,
}));

export const FavoriteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.warning.main,
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.7),
    color: theme.palette.warning.light,
  },
  zIndex: 2,
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: theme.spacing(1.5),
  },
}));

export const RatingPill = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.black, 0.6),
  borderRadius: 4,
  padding: theme.spacing(0.5, 1),
  marginTop: theme.spacing(1),
  width: 'fit-content',
}));

export const FavoritesContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export const DetailContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

export const MovieDetailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

export const BackButton = styled(Button)<{
  component?: React.ElementType;
  to?: string;
}>(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const MetadataItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const MetadataLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

export const GenreChips = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

export const SectionDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const MovieDetailFavoriteButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isFavorite',
})<{ isFavorite: boolean }>(({ theme, isFavorite }) => ({
  color: isFavorite ? theme.palette.warning.main : theme.palette.text.secondary,
  '&:hover': {
    color: isFavorite
      ? theme.palette.warning.dark
      : theme.palette.warning.light,
  },
}));

// Movie Search Page Components
export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4, 0),
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(3, 0, 6),
}));

export const Logo = styled('img')(({ theme }) => ({
  width: '180px',
  height: '180px',
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    height: '150px',
  },
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// NotFound Page Components
export const NotFoundContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

export const NotFoundCode = styled(Typography)(({ theme }) => ({
  fontSize: '8rem',
  fontWeight: 900,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '6rem',
  },
}));

export const NotFoundTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

export const NotFoundDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  marginBottom: theme.spacing(4),
  maxWidth: '600px',
  color: theme.palette.text.secondary,
}));
