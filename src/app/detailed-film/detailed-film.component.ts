import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film.service';
import { Film } from '../models/models';

import { Observable, catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedFilmComponent implements OnInit {
  film$: Observable<Film>;
  isFavourite = false;
  reccomendated$: Observable<Film[]>;

  constructor(
    private readonly _filmService: FilmService,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.film$ = this._filmService.getFilmById(+id).pipe(
          catchError((error) => {
            console.error(error);

            return EMPTY;
          })
        );

        this.isFavourite = this._filmService.checkLocalStorage(+id)
          ? true
          : false;

        this.reccomendated$ = this._filmService.getReccomendations();
      }
    });
  }

  addToFavourites(film: Film): void {
    this._filmService.addtoLocalStorage(film);
    this.isFavourite = true;
  }
}
