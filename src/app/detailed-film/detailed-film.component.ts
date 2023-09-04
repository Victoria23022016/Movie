import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService, Film, Genres } from '../services/film.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.scss'],
})
export class DetailedFilmComponent implements OnInit {
  popularFilms: Film[];
  film: Film;
  isFavourite = false;
  reccomendated: Film[];
  genres: Genres[];
  getRecomendated: Observable<Film[]> = this._filmService.getReccomendations();
  getGenres: Observable<Genres[]> = this._filmService.getGenres();

  constructor(
    private readonly _filmService: FilmService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id &&
        this._filmService.getFilmById(+id).subscribe((film) => {
          this.film = film;
          if (window.localStorage.getItem(`${this.film.id}`)) {
            this.isFavourite = true;
          } else {
            this.isFavourite = false;
          }
          forkJoin([this.getRecomendated, this.getGenres]).subscribe(
            (result) => {
              this.reccomendated = result[0];
              this.genres = result[1];
              this.reccomendated.map(
                (film) => (film.genresToDisplay = this.findGenresById(film))
              );
            }
          );
        });
    });
  }

  addToFavourites(film: Film): void {
    this._filmService.addtoLocalStorage(film);
    this.isFavourite = true;
  }

  findGenresById(film: Film): any {
    let names: String[] = [];
    film.genre_ids.forEach((genre_ids) => {
      names.push(
        this.genres[this.genres.findIndex((el: Genres) => el.id == genre_ids)]
          .name
      );
    });
    return names;
  }
}
