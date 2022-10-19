import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFollowComponent } from './button-follow.component';

describe('ButtonFollowComponent', () => {
  let component: ButtonFollowComponent;
  let fixture: ComponentFixture<ButtonFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFollowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
