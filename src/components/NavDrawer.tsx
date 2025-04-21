import { Link } from 'react-router-dom';

import {
  alpha,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Theme,
} from '@mui/material';

import { MovienatorLogo } from './StyledComponents';

type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; path: string }>;
  isActive: (path: string) => boolean;
  theme: Theme;
};

export function NavDrawer({
  open,
  onClose,
  navItems,
  isActive,
  theme,
}: NavDrawerProps) {
  const drawerContent = (
    <Box
      onClick={onClose}
      sx={{
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
        height: '100%',
      }}
    >
      <MovienatorLogo variant="h6" sx={{ my: 2 }}>
        MOVIENATOR
      </MovienatorLogo>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: 'center',
                color: isActive(item.path)
                  ? theme.palette.common.white
                  : alpha(theme.palette.common.white, 0.7),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                },
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 700 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 240,
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
