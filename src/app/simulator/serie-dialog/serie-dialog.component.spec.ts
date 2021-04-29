import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieDialogComponent } from './serie-dialog.component';

describe('SerieDialogComponent', () => {
  let component: SerieDialogComponent;
  let fixture: ComponentFixture<SerieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
