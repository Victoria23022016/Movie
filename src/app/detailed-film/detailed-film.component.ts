import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService, Film } from '../services/film.service';
import { Observable, catchError, throwError } from 'rxjs';

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
  error = '';

  constructor(
    private readonly _filmService: FilmService,
    private readonly _route: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.film$ = this._filmService.getFilmById(+id).pipe(
          catchError((error) => {
            this.error = error.body.error;
            console.log('Error:', this.error);
            this._cdr.detectChanges();
            return throwError(error);
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
