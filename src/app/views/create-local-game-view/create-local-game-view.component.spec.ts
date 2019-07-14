import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocalGameViewComponent } from './create-local-game-view.component';

describe('CreateLocalGameViewComponent', () => {
  let component: CreateLocalGameViewComponent;
  let fixture: ComponentFixture<CreateLocalGameViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLocalGameViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocalGameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
