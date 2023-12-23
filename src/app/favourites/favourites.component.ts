import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Film } from '../models/models';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent implements OnInit {
  favourites: Film[] = [];

  constructor(private _filmService: FilmService) {}

  ngOnInit(): void {
    if (this._filmService.checkFavouritesInLocalStorage()) {
      this.favourites = this._filmService.parseLocalStorage(this.favourites);
    }
  }

  removeFromFavourites($event: MouseEvent, film: Film): void {
    $event.preventDefault();
    $event.stopPropagation();
    this._filmService.removefromLocalStorage(film.id);
    this._filmService.parseLocalStorage(this.favourites);
  }
}
