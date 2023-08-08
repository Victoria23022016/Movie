import { Component } from '@angular/core';
import { OnInit, Output } from '@angular/core';
import { Film } from '../data/interfaces.service';
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
  popularFilms: any;
  film: any; //почему не могу задать интерфейс Film?

  constructor(public DataService: DataService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log('перед получением');
    this.DataService.popularFilmsSubject$.subscribe((data) => {
      this.popularFilms = data;
      console.log('Принято', this.popularFilms);
    });
    this.route.params.subscribe((params: Params) => {
      this.film = this.DataService.getById(
        +Object.values(params)[0],
        this.popularFilms
      ); //почему здесь нельзя использовать просто params.id?
    });
  }
}
