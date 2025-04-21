import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const LoaderContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
}));

export const PageLoader = () => (
  <LoaderContainer>
    <CircularProgress />
  </LoaderContainer>
);

export const PageErrorLoader = ({ message }: { message?: string }) => (
  <Box sx={{ py: 4 }}>
    <Alert severity="error" sx={{ mb: 2 }}>
      {message || 'An error occurred while loading data'}
    </Alert>
  </Box>
);
