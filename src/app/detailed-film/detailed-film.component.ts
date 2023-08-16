import { Component } from '@angular/core';
import { OnInit, Output } from '@angular/core';
import { Film } from '../data/interfaces.service';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsComponent } from '../posts/posts.component';
import { ReccomendatedFilm } from '../data/interfaces.service';
import { LocalStorage } from '../data/localstorage.service';

@Component({
  selector: 'app-detailed-film',
  templateUrl: './detailed-film.component.html',
  styleUrls: ['./detailed-film.component.scss'],
})
export class DetailedFilmComponent implements OnInit {
  popularFilms: any; //почему не могу задать интерфейс Film?
  film: any; //почему не могу задать интерфейс Film?
  activatedBtn = false;
  constructor(
    public DataService: DataService,
    private route: ActivatedRoute,
    public LocalStorage: LocalStorage
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      id &&
        this.DataService.getById(+id).subscribe((film) => {
          this.film = film;
        });
    });
  }
  AddToFavourites(film: any): void {
    this.LocalStorage.listOfFavourites.push(film);
    console.log(`Добавили в фавориты ${this.LocalStorage.listOfFavourites}`);
    this.activatedBtn = !this.activatedBtn;
  }
}