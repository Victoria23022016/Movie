import { Component, OnInit } from '@angular/core';
import { Film, Genres } from '../data/interfaces.service';
import { Input } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(public DataService: DataService, private http: HttpClient) {}

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
    this.http
      .get<Film[]>(
        'https://api.themoviedb.org/3/movie/popular?api_key=ba5272b504616d17b0eb3ab1fc040852'
      )
      .subscribe((response) => {
        console.log('Response', response);
      });
  }
}
