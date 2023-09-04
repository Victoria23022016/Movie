import { Component, Input } from '@angular/core';
import { Film } from '../services/film.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() film: Film;
}
