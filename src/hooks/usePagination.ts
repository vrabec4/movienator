import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get('page') || '1', 10);

  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
  };

  useEffect(
    function scrollToTopOnPageChange() {
      window.scrollTo(0, 0);
    },
    [currentPage],
  );

  return { currentPage, setPage };
}
