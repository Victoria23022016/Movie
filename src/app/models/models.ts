export interface Genres {
  id: number;
  name: string;
  genres?: any;
}

export interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genresToDisplay?: string[];
}

export interface User {
  email: string;
  password: string;
  favourites?: string;
}
