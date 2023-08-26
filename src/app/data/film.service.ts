import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genres {
  id: number;
  name: string;
  genres?: any;
}

export interface Film {
  adult: boolean;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface listOfFilms {
  page: number;
  results: Film[];
}

export interface listOfGenres {
  genres: Genres[];
}

@Injectable({ providedIn: 'root' })
export class FilmService {
  url = 'https://api.themoviedb.org/3/movie';
  key = 'ba5272b504616d17b0eb3ab1fc040852';
  constructor(public http: HttpClient) {}

  getFilms(): Observable<listOfFilms> {
    return this.http.get<listOfFilms>(
      `${this.url}/popular?api_key=${this.key}`
    );
  }

  getFilmById(id: Film['id']): Observable<Film> {
    return this.http.get<Film>(`${this.url}/${id}?api_key=${this.key}`);
  }
  getReccomendations(id: Film['id']): Observable<listOfFilms> {
    return this.http.get<listOfFilms>(
      `${this.url}/${id}/recommendations?api_key=${this.key}`
    );
  }
  getGenres(): Observable<listOfGenres> {
    return this.http.get<listOfGenres>(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=ba5272b504616d17b0eb3ab1fc040852'
    );
  }
  parseLocalStorage(favourites: Film[]) {
    let localKeys = Object.values(window.localStorage).map((key) =>
      JSON.parse(key)
    );
    favourites.splice(0, favourites.length, ...localKeys);
    return favourites;
  }

  addtoLocalStorage(film: Film, btn: boolean): void {
    if (!window.localStorage.getItem(`${film.id}`)) {
      window.localStorage[film.id] = JSON.stringify(film);
      btn = false;
    }
  }

  removefromLocalStorage(id: number): void {
    window.localStorage.removeItem(`${id}`);
  }
}
