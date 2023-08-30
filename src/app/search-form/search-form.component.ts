import { Component, OnInit } from '@angular/core';
import { FilmService } from '../data/film.service';
import { Film, Genres } from '../data/film.service';
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
})
export class SearchFormComponent implements OnInit {
  genres: Genres[];
  films$: Observable<Film[]>;
  private searchTerms = new Subject<string>();
  constructor(private filmService: FilmService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.films$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.filmService.searchFilm(term))
    );
    this.filmService.getGenres().subscribe((response) => {
      this.genres = response;
    });
    console.log(this.films$);
  }
}
