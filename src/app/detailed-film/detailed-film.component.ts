import { ChangeDetectorRef, Component } from '@angular/core';
import { OnInit, Output } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsComponent } from '../posts/posts.component';
import { ReccomendatedFilm } from '../data/interfaces.service';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.scss'],
})
export class DetailedFilmComponent implements OnInit {
  popularFilms: Film[]; //почему не могу задать интерфейс Film?
  film: Film; //почему не могу задать интерфейс Film?
  activatedBtn = false;
  reccomendated: any;
  genres: Genres[];
  constructor(public DataService: DataService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id &&
        this.DataService.getById(+id).subscribe((film) => {
          this.film = film;
          this.DataService.getReccomendations(this.film.id).subscribe(
            (response) => {
              this.reccomendated = response.results;
              console.log('Обновили рекомендации');
            }
          );
          this.DataService.getGenres().subscribe((response) => {
            this.genres = response.genres;
          });
        });
    });
  }
  AddToFavourites(film: any): void {
    window.localStorage[film.id] = JSON.stringify(film);
    console.log(`Добавили новый фильм в фавориты ${window.localStorage}`);
    this.activatedBtn = !this.activatedBtn;
  }
}
