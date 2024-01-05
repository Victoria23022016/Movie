import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Film } from '../models/models';

@Component({
  selector: 'app-film-card-small',
  templateUrl: './film-card-small.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardSmallComponent {
  @Input() film: Film;
}
