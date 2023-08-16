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
export class DataService {
  constructor(public http: HttpClient) {}

  getGenres(): Observable<any> {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=ba5272b504616d17b0eb3ab1fc040852'
    );
  }

  getPopularFilms(): Observable<any> {
    return this.http.get<any>( //переделать под нормальный тип данных
      'https://api.themoviedb.org/3/movie/popular?api_key=ba5272b504616d17b0eb3ab1fc040852'
    );
  }

  getById(id: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ba5272b504616d17b0eb3ab1fc040852`
    );
  }
  getReccomendations(id: number): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=ba5272b504616d17b0eb3ab1fc040852`
    );
  }

  findGenresById(arr: Film, films: any, genres: any): any {
    if (films) {
      let names: any = [];
      arr.genre_ids.forEach((genre_ids) => {
        names.push(
          genres[genres.findIndex((el: any) => el.id == genre_ids)].name
        );
      });
      return names;
    }
  }
}
