import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Film } from '../services/film.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
  @Input() film: Film;
}
