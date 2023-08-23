import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genres {
  id: number;
  name: string;
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

@Injectable({ providedIn: 'root' })
export class FilmService {
  url = 'https://api.themoviedb.org/3/movie';
  key = 'ba5272b504616d17b0eb3ab1fc040852';
  constructor(public http: HttpClient) {}

  getFilms(): Observable<Film> {
    return this.http.get<Film>(`${this.url}/popular?api_key=${this.key}`);
  }

  getFilmById(id: Film['id']): Observable<Film> {
    return this.http.get<Film>(`${this.url}/${id}?api_key=${this.key}`);
  }
  getReccomendations(id: Film['id']): Observable<Film> {
    return this.http.get<Film>(
      `${this.url}/${id}/recommendations?api_key=${this.key}`
    );
  }
}
