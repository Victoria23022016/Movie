import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../data/interfaces.service';
import { DataService } from '../data/data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recommendated',
  templateUrl: './recommendated.component.html',
  styleUrls: ['./recommendated.component.scss'],
})
export class RecommendatedComponent implements OnInit {
  @Input() film: any;
  reccomendated: any;
  constructor(
    public DataService: DataService,
    private readonly _cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.DataService.getReccomendations(this.film.id).subscribe((response) => {
      this.reccomendated = response.results;
      this._cdr.detectChanges;
      console.log('Обновили рекомендации');
    });
  }
}
