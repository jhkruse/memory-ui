import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerSvgComponent } from './winner-svg.component';

describe('WinnerSvgComponent', () => {
  let component: WinnerSvgComponent;
  let fixture: ComponentFixture<WinnerSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
