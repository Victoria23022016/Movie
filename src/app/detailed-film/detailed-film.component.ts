import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService, Film, Genres } from '../data/film.service';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.scss'],
})
export class DetailedFilmComponent implements OnInit {
  popularFilms: Film[];
  film: Film;
  activatedBtn = false;
  reccomendated: Film[];
  genres: Genres[];
  constructor(public filmService: FilmService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id &&
        this.filmService.getFilmById(+id).subscribe((film) => {
          this.film = film;
          if (window.localStorage.getItem(`${this.film.id}`)) {
            this.activatedBtn = true;
          } else {
            this.activatedBtn = false;
          }
          this.filmService
            .getReccomendations(this.film.id)
            .subscribe((response) => {
              this.reccomendated = response.results;
            });
          this.filmService.getGenres().subscribe((response) => {
            this.genres = response.genres;
          });
        });
    });
  }
  addToFavourites(film: Film): void {
    if (!window.localStorage.getItem(`${film.id}`)) {
      window.localStorage[film.id] = JSON.stringify(film);
      this.activatedBtn = false;
    }
  }
}
