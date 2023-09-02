import { Component, Input } from '@angular/core';
import { Film, Genres } from '../services/film.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() film: Film;
  @Input() genres: Genres[];

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
