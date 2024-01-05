import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, map, of, tap } from 'rxjs';
import { Film, Genres, User } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FilmService {
  filmsUrl = 'api/films';
  genresUrl = 'api/genres';
  recomendUrl = 'api/reccomendated';
  genres: Genres[] = [];
  popularFilms: Film[];

  constructor(
    private _http: HttpClient,
    private readonly _authService: AuthService
  ) {}

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
          this._assignGenres(genres, film);

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
          this._assignGenres(genres, film);
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
          this._assignGenres(genres, film);
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
    const currentUser: User = this._authService.getCurrentUser();
    const parsedUsers = JSON.parse(window.localStorage['users']);
    let localKeys = parsedUsers[`${currentUser.email}`].favourites;
    localKeys = Object.values(localKeys);
    favourites.splice(0, favourites.length, ...localKeys);
    return favourites;
  }

  addtoLocalStorage(film: Film): void {
    const currentUser: User = this._authService.getCurrentUser();
    const parsedUsers = JSON.parse(window.localStorage['users']);
    parsedUsers[`${currentUser.email}`].favourites[`${film.id}`] = film;
    this._reassignUsersInLocalStorage(parsedUsers);
  }

  checkFavouritesInLocalStorage(): boolean {
    const currentUser: User = this._authService.getCurrentUser();
    const parsedUsers = JSON.parse(window.localStorage['users']);
    return parsedUsers[`${currentUser.email}`].favourites ? true : false;
  }

  checkFilmInLocalStorage(id: number): boolean {
    const currentUser: User = this._authService.getCurrentUser();
    const parsedUsers = JSON.parse(window.localStorage['users']);
    return parsedUsers[`${currentUser.email}`].favourites[`${id}`]
      ? true
      : false;
  }

  removefromLocalStorage(id: number): void {
    const currentUser: User = this._authService.getCurrentUser();
    const parsedUsers = JSON.parse(window.localStorage['users']);
    delete parsedUsers[`${currentUser.email}`].favourites[id];
    this._reassignUsersInLocalStorage(parsedUsers);
  }

  private _reassignUsersInLocalStorage(parsedUsers: Object): void {
    window.localStorage['users'] = JSON.stringify(parsedUsers);
  }

  private _findGenresById(film: Film, genres: Genres[]): string[] {
    const names: string[] = [];
    film.genre_ids.forEach((genre_ids) => {
      names.push(
        genres[genres.findIndex((el: Genres) => el.id == genre_ids)].name
      );
    });
    return names;
  }

  private _assignGenres(genres: Genres[], film: Film) {
    film.genresToDisplay = this._findGenresById(film, genres);
  }
}
