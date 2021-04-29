import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidimensionalViewComponent } from './bidimensional-view.component';

describe('BidimensionalViewComponent', () => {
  let component: BidimensionalViewComponent;
  let fixture: ComponentFixture<BidimensionalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidimensionalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidimensionalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
