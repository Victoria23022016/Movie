import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService, Film, Genres } from '../services/film.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  mergeMap,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit {
  private _searchTerms = new Subject<string>();

  genres: Genres[];
  films$: Observable<Film[]>;

  constructor(private readonly _filmService: FilmService) {}

  search(term: string): void {
    this._searchTerms.next(term);
  }

  ngOnInit(): void {
    this._filmService.getGenres().subscribe((result) => {
      this.genres = result;
      this.films$ = this._searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        mergeMap((term: string) => this._filmService.searchFilm(term)),
        map((film) =>
          film.map((el) => (el.genresToDisplay = this.findGenresById(el)))
        )
      );
    });
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
