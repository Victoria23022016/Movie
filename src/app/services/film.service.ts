import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
  constructor(public http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmsUrl);
  }

  getFilmById(id: Film['id']): Observable<Film> {
    const filmsByIdUrl = `${this.filmsUrl}/${id}`;
    return this.http.get<Film>(filmsByIdUrl);
  }
  getReccomendations(): Observable<Film[]> {
    return this.http.get<Film[]>(this.recomendUrl);
  }
  getGenres(): Observable<Genres[]> {
    return this.http.get<Genres[]>(this.genresUrl);
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

  removefromLocalStorage(id: number): void {
    window.localStorage.removeItem(`${id}`);
  }

  searchFilm(term: string): Observable<Film[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?title=${term}`);
  }
}
