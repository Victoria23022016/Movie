import { Component, Output } from '@angular/core';
import { DataService } from './data/data.service';
import {
  Genres,
  DetailedFilm,
  Film,
  ReccomendatedFilm,
} from './data/interfaces.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'movie-project';
}
