import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService, Film } from '../services/film.service';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.scss'],
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
        this.film$ = this._filmService.getFilmById(+id);

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
