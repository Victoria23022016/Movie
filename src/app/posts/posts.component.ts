import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FilmService, Film } from '../services/film.service';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  popularFilms$: Observable<Film[]>;
  error = '';

  constructor(
    private readonly _filmService: FilmService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.popularFilms$ = this._filmService.getFilms().pipe(
      catchError((error) => {
        this.error = error.body.error;
        console.log('Error:', this.error);
        this._cdr.detectChanges();
        return throwError(error);
      })
    );
  }
}
