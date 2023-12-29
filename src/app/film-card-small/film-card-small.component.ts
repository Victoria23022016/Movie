import { Component, Input } from '@angular/core';
import { Film } from '../models/models';

@Component({
  selector: 'app-film-card-small',
  templateUrl: './film-card-small.component.html',
  styleUrls: ['./film-card-small.component.scss'],
})
export class FilmCardSmallComponent {
  @Input() film: Film;
}
