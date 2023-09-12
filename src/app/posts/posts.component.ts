import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilmService, Film } from '../services/film.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  popularFilms$: Observable<Film[]>;

  constructor(private readonly _filmService: FilmService) {}

  ngOnInit(): void {
    this.popularFilms$ = this._filmService.getFilms();
  }
}
