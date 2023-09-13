import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService, Film } from '../services/film.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
} from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  private _searchTerms = new Subject<string>();

  films$: Observable<Film[]>;

  constructor(private readonly _filmService: FilmService) {}

  search(term: string): void {
    this._searchTerms.next(term);
  }

  ngOnInit(): void {
    this.films$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((term: string) => this._filmService.searchFilm(term))
    );
  }
}
