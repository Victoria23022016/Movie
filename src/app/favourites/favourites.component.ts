import { Component, OnInit } from '@angular/core';
import { Film } from '../services/film.service';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favourites: Film[] = [];
  constructor(public filmService: FilmService) {}

  ngOnInit(): void {
    this.favourites = this.filmService.parseLocalStorage(this.favourites);
  }
  removeFromFavourites($event: MouseEvent, film: Film): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.filmService.removefromLocalStorage(film.id);
    this.filmService.parseLocalStorage(this.favourites);
  }
}
