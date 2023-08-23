import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Film } from '../data/interfaces.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;
  foundFilms: Film[];
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      includeAdult: new FormControl('', [Validators.required]),
      year: new FormControl(''),
    });
  }
  searchMovie(title: string, includeAdult: boolean, year: string) {
    let params = new HttpParams();
    params = params.append('query', `${title}`);
    params = params.append('include_adult', includeAdult);
    params = params.append('year', `${year}`);
    return this.http.get<any>(
      'https://api.themoviedb.org/3/search/movie?api_key=ba5272b504616d17b0eb3ab1fc040852', //сделать константы, вынести в сервис после мерджа
      {
        params,
      }
    );
  }
  onSubmit(): void {
    const formData = { ...this.form.value };
    this.searchMovie(
      formData.title,
      formData.includeAdult,
      formData.year
    ).subscribe((response) => {
      this.foundFilms = response.results;
      console.log('Список найденных фильмов:', this.foundFilms);
    });
  }
}
