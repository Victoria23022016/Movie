import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Film } from '../models/models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  popularFilms$: Observable<Film[]>;
  index: number = 1;
  filmsPerPage: number = 8;

  constructor(private readonly _filmService: FilmService) {}

  ngOnInit(): void {
    this.popularFilms$ = this._filmService.getFilms().pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  getPaginatedFilms(popularFilms: Film[] | null): Film[] | null {
    const start: number = (this.index - 1) * this.filmsPerPage;
    const end: number = start + this.filmsPerPage;
    if (popularFilms) {
      return popularFilms.slice(start, end);
    }
    return null;
  }

  changePage(page: number): void {
    this.index = page;
  }
}
