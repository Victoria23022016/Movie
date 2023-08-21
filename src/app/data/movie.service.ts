import { Injectable } from '@angular/core';
import {
  Film,
  Genres,
  DetailedFilm,
  ReccomendatedFilm,
} from './interfaces.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  url = 'https://api.themoviedb.org/3/movie';
  key = 'ba5272b504616d17b0eb3ab1fc040852';
  constructor(public http: HttpClient) {}

  getFilms(): Observable<Film> {
    return this.http.get<Film>(`${this.url}/popular?api_key=${this.key}`);
  }

  getMovieById(id: number): Observable<DetailedFilm> {
    return this.http.get<DetailedFilm>(`${this.url}/${id}?api_key=${this.key}`);
  }
  getReccomendations(id: number): Observable<ReccomendatedFilm> {
    return this.http.get<ReccomendatedFilm>(
      `${this.url}/${id}/recommendations?api_key=${this.key}`
    );
  }
}
