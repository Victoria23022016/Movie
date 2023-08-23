import { Component, OnInit, Output } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { Input } from '@angular/core';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  popularFilms: any; //поменять тип данных
  genres: any; //поменять тип данных

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
