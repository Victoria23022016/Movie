import { Component, OnInit } from '@angular/core';
import { FilmService, Film, Genres } from '../services/film.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  popularFilms: Film[];
  genres: Genres[];
  getFilms: Observable<Film[]> = this._filmService.getFilms();
  getGenres: Observable<Genres[]> = this._filmService.getGenres();

  constructor(private readonly _filmService: FilmService) {}

  ngOnInit(): void {
    forkJoin([this.getFilms, this.getGenres]).subscribe((result) => {
      this.popularFilms = result[0];
      this.genres = result[1];
      this.popularFilms.map(
        (film) => (film.genresToDisplay = this.findGenresById(film))
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
