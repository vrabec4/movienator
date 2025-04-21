export type Rating = {
  Source: string;
  Value: string;
};

export type MovieDetail = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type Movie = Pick<
  MovieDetail,
  'imdbID' | 'Title' | 'Year' | 'Type' | 'Poster'
>;

export type FavoriteMovie = Pick<
  MovieDetail,
  'imdbID' | 'Title' | 'Year' | 'Poster' | 'imdbRating' | 'Type'
>;

export type MovieSearchSuccessResponse = {
  Search: Movie[];
  totalResults: string;
  Response: 'True';
};

export type MovieSearchErrorResponse = {
  Response: 'False';
  Error: string;
};

export type MovieSearchResponse =
  | MovieSearchSuccessResponse
  | MovieSearchErrorResponse;

export type APIErrorResponse = {
  status: number;
  message: string;
};
