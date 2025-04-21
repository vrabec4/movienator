import { useMediaQuery, useTheme } from '@mui/material';

export const useMobileView = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};
