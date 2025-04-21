import { MovieDetail } from '@/types';

export function calculateImdbRatingOutOf5(movie?: MovieDetail): number {
  if (!movie || !movie.imdbRating || movie.imdbRating === 'N/A') return 0;

  const numericRating = parseFloat(movie.imdbRating);
  return (numericRating / 10) * 5;
}
