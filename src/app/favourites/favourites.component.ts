import { Component, OnInit } from '@angular/core';
import { Film } from '../data/interfaces.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favourites: Film[] = [];
  constructor() {}

  parseLocalStorage() {
    let localKeys = Object.values(window.localStorage).map((key) =>
      JSON.parse(key)
    );
    this.favourites.splice(0, this.favourites.length, ...localKeys);
  }

  ngOnInit(): void {
    this.parseLocalStorage();
  }

  removeFromFavourites($event: MouseEvent, film: Film): void {
    $event.preventDefault();
    $event.stopPropagation();
    window.localStorage.removeItem(`${film.id}`);
    this.parseLocalStorage();
  }
}
