import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedFilmComponent } from './detailed-film.component';

describe('DetailedFilmComponent', () => {
  let component: DetailedFilmComponent;
  let fixture: ComponentFixture<DetailedFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedFilmComponent]
    });
    fixture = TestBed.createComponent(DetailedFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
