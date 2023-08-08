import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../data/interfaces.service';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-recommendated',
  templateUrl: './recommendated.component.html',
  styleUrls: ['./recommendated.component.scss'],
})
export class RecommendatedComponent implements OnInit {
  @Input() film: any;
  reccomendated: any;
  constructor(public DataService: DataService) {}
  ngOnInit(): void {
    this.DataService.getReccomendations(this.film.id).subscribe((response) => {
      this.reccomendated = response.results;
    });
  }
}
