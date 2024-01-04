import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Film } from '../models/models';

@Component({
  selector: 'app-film-card',

  styleUrls: ['./film-card.component.css'],
  templateUrl: './film-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
  @Input() film: Film;
}
