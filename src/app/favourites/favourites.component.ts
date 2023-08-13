import { Component } from '@angular/core';
import { LocalStorage } from '../data/localstorage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  constructor(public LocalStorage: LocalStorage) {}
  RemoveFromFavourites(film: any): void {
    console.log('Film id:', film.id);
    let spliceId = this.LocalStorage.listOfFavourites.findIndex(
      (el: any) => el.id == film.id
    );
    console.log(spliceId);
    this.LocalStorage.listOfFavourites.splice(spliceId, 1);
    console.log(this.LocalStorage.listOfFavourites);
  }
}
