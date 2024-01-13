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
  @ViewChild('searchBox') searchBox: HTMLInputElement;

  private _searchTerms = new Subject<string>();
  films$: Observable<Film[]>;
  searchInput: boolean = false;
  term: string = '';

  constructor(private readonly _filmService: FilmService) {}

  search(): void {
    this._searchTerms.next(this.term);
  }

  ngOnInit(): void {
    this.films$ = this._searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap((term: string) => this._filmService.searchFilm(term))
    );
  }

  showInput(): void {
    this.searchInput = true;
  }

  hideInput(): void {
    this.searchInput = false;
    this.term = '';
  }
}
