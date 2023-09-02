import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService, Film, Genres } from '../services/film.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  genres$: Observable<Genres[]> = this._filmService.getGenres();
  films$: Observable<Film[]>;

  private _searchTerms = new Subject<string>();

  constructor(private readonly _filmService: FilmService) {}

  search(term: string): void {
    this._searchTerms.next(term);
  }

  ngOnInit(): void {
    this.films$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this._filmService.searchFilm(term))
    );
  }
}
