import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === '/';

  useEffect(function handleWindowScroll() {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.length >= 3) {
      if (!isSearchPage) {
        navigate(`/?q=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`?q=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  useEffect(
    function syncSearchTermWithUrlParams() {
      if (isSearchPage) {
        const params = new URLSearchParams(location.search);
        const urlSearchTerm = params.get('q') || '';
        setSearchTerm(urlSearchTerm);
      }
    },
    [location.search, isSearchPage],
  );

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const closeDrawer = () => setDrawerOpen(false);

  return {
    theme,
    isMobile,
    searchTerm,
    setSearchTerm,
    drawerOpen,
    scrolled,
    isSearchPage,
    handleSearch,
    isActive,
    toggleDrawer,
    closeDrawer,
  };
};

export default useNavbar;
