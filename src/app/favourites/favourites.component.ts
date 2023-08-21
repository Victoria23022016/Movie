import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favourites: any = [];
  constructor() {}

  ParseLocalStorage() {
    let localKeys = Object.values(window.localStorage);
    for (let key of localKeys) {
      this.favourites.push(JSON.parse(key)); //переделать, не пушить а обновлять
    }
    console.log('Favourites:', this.favourites);
  }

  ngOnInit(): void {
    this.ParseLocalStorage();
  }

  RemoveFromFavourites($event: MouseEvent, film: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('Film id:', film.id);
    window.localStorage.removeItem(`${film.id}`);
    this.ParseLocalStorage();
  }
}
