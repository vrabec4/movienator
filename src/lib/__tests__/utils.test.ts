import { describe, expect, it } from 'vitest';

import { MovieDetail } from '@/types';

import { calculateImdbRatingOutOf5 } from '../utils';

describe('calculateImdbRatingOutOf5', () => {
  it('should return 0 when no movie is provided', () => {
    expect(calculateImdbRatingOutOf5()).toBe(0);
  });

  it('should return 0 when movie has no imdbRating', () => {
    const movie = {} as MovieDetail;
    expect(calculateImdbRatingOutOf5(movie)).toBe(0);
  });

  it('should return 0 when movie imdbRating is "N/A"', () => {
    const movie = { imdbRating: 'N/A' } as MovieDetail;
    expect(calculateImdbRatingOutOf5(movie)).toBe(0);
  });

  it('should convert rating from 10-scale to 5-scale correctly', () => {
    const movie = { imdbRating: '8.4' } as MovieDetail;
    expect(calculateImdbRatingOutOf5(movie)).toBe(4.2);
  });

  it('should handle edge cases correctly', () => {
    expect(calculateImdbRatingOutOf5({ imdbRating: '10' } as MovieDetail)).toBe(
      5,
    );
    expect(calculateImdbRatingOutOf5({ imdbRating: '0' } as MovieDetail)).toBe(
      0,
    );
  });
});
