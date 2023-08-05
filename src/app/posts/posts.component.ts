import { Component, OnInit } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() film!: Film; //вопрос: почему работает только с !
  @Input() genres!: Genres[];
  //arrays: any = this.film.genre_ids;

  constructor() {}
  ngOnInit(): void {
    console.log(this.film);
  }
}
