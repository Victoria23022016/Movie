import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FilmService } from '../services/film.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
} from 'rxjs';
import { Film } from '../models/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
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
