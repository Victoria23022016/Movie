import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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
  popularFilms: Film[];
  film: Film;

  constructor(public DataService: DataService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id &&
        this.DataService.getById(+id).subscribe((film) => (this.film = film));
    });
  }
}
