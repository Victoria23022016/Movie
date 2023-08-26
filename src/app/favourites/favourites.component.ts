import { Component, OnInit } from '@angular/core';
import { Film } from '../data/film.service';
import { FilmService } from '../data/film.service';

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
    //нужно вынести в сервис?
    $event.preventDefault();
    $event.stopPropagation();
    window.localStorage.removeItem(`${film.id}`);
    this.filmService.parseLocalStorage(this.favourites);
  }
}
