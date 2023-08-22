import { Component, OnInit } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  popularFilms: Film[];
  genres: Genres[];

  constructor(public DataService: DataService) {}

  ngOnInit(): void {
    this.DataService.getPopularFilms().subscribe((response) => {
      this.popularFilms = response.results;
    });
    this.DataService.getGenres().subscribe((response) => {
      this.genres = response.genres;
    });
  }
}
