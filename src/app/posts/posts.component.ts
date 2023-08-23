import { Component, OnInit, Output } from '@angular/core';
import { FilmService, Film, Genres } from '../data/film.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  popularFilms: Film[];
  genres: Genres[];

  constructor(public filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe((response) => {
      this.popularFilms = response.results;
    });
    /* this.filmService.getGenres().subscribe((response) => {
      this.genres = response.genres;
    });*/
  }
}
