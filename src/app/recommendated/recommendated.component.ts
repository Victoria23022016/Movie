import { Component, Input } from '@angular/core';
import { Film } from '../data/interfaces.service';

@Component({
  selector: 'app-recommendated',
  templateUrl: './recommendated.component.html',
  styleUrls: ['./recommendated.component.scss'],
})
export class RecommendatedComponent {
  @Input() film: any;
}
