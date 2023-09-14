import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, tap } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class FilmService {
  filmsUrl = 'api/films';
  genresUrl = 'api/genres';
  recomendUrl = 'api/reccomendated';
  genres: Genres[] = [];
  popularFilms: Film[];

  constructor(private _http: HttpClient) {}

  getGenres(): Observable<Genres[]> {
    if (!this.genres.length) {
      return this._http
        .get<Genres[]>(this.genresUrl)
        .pipe(tap((response) => (this.genres = response)));
    }
    return of(this.genres);
  }

  getFilms(): Observable<Film[]> {
    return forkJoin([
      this.getGenres(),
      this._http.get<Film[]>(this.filmsUrl),
    ]).pipe(
      map(([genres, films]) =>
        films.map((film) => {
          this.assignGenres(genres, film);
          return film;
        })
      )
    );
  }

  getReccomendations(): Observable<Film[]> {
    return forkJoin([
      this.getGenres(),
      this._http.get<Film[]>(this.recomendUrl),
    ]).pipe(
      map(([genres, films]) =>
        films.map((film) => {
          this.assignGenres(genres, film);
          return film;
        })
      )
    );
  }

  searchFilm(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return forkJoin([
      this.getGenres(),
      this._http.get<Film[]>(`${this.filmsUrl}/?title=${term}`),
    ]).pipe(
      map(([genres, films]) =>
        films.map((film) => {
          this.assignGenres(genres, film);
          return film;
        })
      )
    );
  }

  getFilmById(id: Film['id']): Observable<Film> {
    const filmsByIdUrl = `${this.filmsUrl}/${id}`;
    return this._http.get<Film>(filmsByIdUrl);
  }

  parseLocalStorage(favourites: Film[]): Film[] {
    let localKeys = Object.values(window.localStorage).map((key) =>
      JSON.parse(key)
    );
    favourites.splice(0, favourites.length, ...localKeys);
    return favourites;
  }

  addtoLocalStorage(film: Film): void {
    if (!window.localStorage.getItem(`${film.id}`)) {
      window.localStorage[film.id] = JSON.stringify(film);
    }
  }

  checkLocalStorage(id: number): boolean {
    return window.localStorage.getItem(`${id}`) ? true : false;
  }

  removefromLocalStorage(id: number): void {
    window.localStorage.removeItem(`${id}`);
  }

  _findGenresById(film: Film, genres: Genres[]): string[] {
    const names: string[] = [];
    film.genre_ids.forEach((genre_ids) => {
      names.push(
        genres[genres.findIndex((el: Genres) => el.id == genre_ids)].name
      );
    });
    return names;
  }

  assignGenres(genres: Genres[], film: Film) {
    film.genresToDisplay = this._findGenresById(film, genres);
  }
}
