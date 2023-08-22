import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ReccomendatedFilm } from '../data/interfaces.service';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.scss'],
})
export class DetailedFilmComponent implements OnInit {
  popularFilms: Film[];
  film: Film;
  activatedBtn = false;
  reccomendated: ReccomendatedFilm[];
  genres: Genres[];
  constructor(public DataService: DataService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id &&
        this.DataService.getById(+id).subscribe((film) => {
          this.film = film;
          if (window.localStorage.getItem(`${this.film.id}`)) {
            this.activatedBtn = true;
          } else {
            this.activatedBtn = false;
          }
          this.DataService.getReccomendations(this.film.id).subscribe(
            (response) => {
              this.reccomendated = response.results;
            }
          );
          this.DataService.getGenres().subscribe((response) => {
            this.genres = response.genres;
          });
        });
    });
  }
  AddToFavourites(film: any): void {
    if (!window.localStorage.getItem(`${film.id}`)) {
      window.localStorage[film.id] = JSON.stringify(film);
      this.activatedBtn = !this.activatedBtn;
    }
  }
}
