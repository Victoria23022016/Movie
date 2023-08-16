import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  form: any; //почему не могу задать тип FormGroup?
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      includeAdult: new FormControl(''),
      year: new FormControl(''),
    });
  }
  searchMovie() {
    let params = new HttpParams();
    params = params.append('query', 'river');
    params = params.append('include_adult', true); //почему не учитывается этот параметр?
    return this.http.get<any>(
      'https://api.themoviedb.org/3/search/movie?api_key=ba5272b504616d17b0eb3ab1fc040852',
      {
        params,
      }
    );
  }
  onSubmit(): void {
    const formData = { ...this.form.value };
    console.log(formData.includeAdult); //убрать потом
    this.searchMovie().subscribe((response) => {
      console.log('Response:', response);
    });
  }
}
