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

  getFilms(): Observable<any> {
    return this.http.get<any>( //переделать под нормальный тип данных
      `${this.url}/popular?api_key=${this.key}`
    );
  }

  getMovieById(id: number) {
    return this.http.get<any>(`${this.url}/${id}?api_key=${this.key}`);
  }
  getReccomendations(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/${id}/recommendations?api_key=${this.key}`
    );
  }
}
