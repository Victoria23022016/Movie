import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendatedComponent } from './recommendated.component';

describe('RecommendatedComponent', () => {
  let component: RecommendatedComponent;
  let fixture: ComponentFixture<RecommendatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendatedComponent]
    });
    fixture = TestBed.createComponent(RecommendatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
