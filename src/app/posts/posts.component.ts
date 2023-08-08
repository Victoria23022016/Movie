import { Component, OnInit, Output } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { Input } from '@angular/core';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Output() popularFilms: any; //поменять тип данных

  constructor(public DataService: DataService) {}

  findGengesById(arr: Film): Array<string> {
    let names = [];
    for (let genre_ids of arr.genre_ids) {
      names.push(
        this.DataService.genres[
          this.DataService.genres.findIndex((el) => el.id == genre_ids)
        ].name
      );
    }
    return names;
  }
  ngOnInit(): void {
    this.DataService.getPopularFilms().subscribe((response) => {
      this.popularFilms = response.results;
      this.DataService.transitPopularFilms(this.popularFilms);
      console.log('Данные отправлены', this.popularFilms);
    });
  }
}
