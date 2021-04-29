import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveViewComponent } from './wave-view.component';

describe('WaveViewComponent', () => {
  let component: WaveViewComponent;
  let fixture: ComponentFixture<WaveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
