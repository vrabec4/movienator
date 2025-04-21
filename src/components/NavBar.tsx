import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';

import useNavbar from '../hooks/useNavbar';
import { NavDrawer } from './NavDrawer';
import {
  MovienatorLogo,
  NavButton,
  Search,
  SearchButton,
  SearchIconWrapper,
  StyledInputBase,
} from './StyledComponents';

const navItems = [
  { name: 'Movie Search', path: '/' },
  { name: 'Favorites', path: '/favorites' },
];

export function NavBar() {
  const {
    theme,
    isMobile,
    searchTerm,
    setSearchTerm,
    drawerOpen,
    scrolled,
    handleSearch,
    isActive,
    toggleDrawer,
    closeDrawer,
  } = useNavbar();

  return (
    <AppBar
      position="sticky"
      sx={{
        width: '100%',
        backgroundColor: scrolled
          ? theme.palette.background.default
          : 'transparent',
        boxShadow: scrolled ? '0px 2px 10px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <MovienatorLogo
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            flexGrow: isMobile ? 1 : 0,
            display: { xs: 'flex' },
            mr: 2,
          }}
        >
          {isMobile ? (
            <img
              src="../assets/movienator-logo.svg"
              alt="Movienator"
              height="32"
            />
          ) : (
            'MOVIENATOR'
          )}
        </MovienatorLogo>
        {!isMobile && (
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {navItems.map((item) => (
              <NavButton
                key={item.name}
                component={Link}
                to={item.path}
                active={isActive(item.path)}
              >
                {item.name}
              </NavButton>
            ))}
          </Box>
        )}
        <Box component="form" onSubmit={handleSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Enter at least 3 characters to search…"
              inputProps={{ 'aria-label': 'Enter at least 3 characters to search…' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit" variant="contained" disableElevation>
              Search
            </SearchButton>
          </Search>
        </Box>
      </Toolbar>
      <NavDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        navItems={navItems}
        isActive={isActive}
        theme={theme}
      />
    </AppBar>
  );
}
