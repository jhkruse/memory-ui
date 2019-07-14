import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServerGameViewComponent } from './create-server-game-view.component';

describe('CreateServerGameViewComponent', () => {
  let component: CreateServerGameViewComponent;
  let fixture: ComponentFixture<CreateServerGameViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServerGameViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServerGameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
