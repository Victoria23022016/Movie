import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'nz-pagination-basic',
  template: `
    <nz-pagination
      [nzPageIndex]="currentPage"
      [nzTotal]="totalFilms"
      [nzPageSize]="filmsPerPage"
      (nzPageIndexChange)="onClick.emit($event)"
    ></nz-pagination>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NzPaginationBasicComponent {
  @Input() totalFilms: number | null;
  @Input() currentPage: number;
  @Input() filmsPerPage: number;
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPages: number;
  page: number;

  ngOnInit(): void {
    if (this.totalFilms) {
      this.totalPages = Math.ceil(this.totalFilms / this.filmsPerPage);
    }
  }
}
