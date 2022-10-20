import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProductsComponent } from './profile-products.component';

describe('ProfileProductsComponent', () => {
  let component: ProfileProductsComponent;
  let fixture: ComponentFixture<ProfileProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
