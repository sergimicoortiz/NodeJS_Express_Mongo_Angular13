import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductsComponent } from './card-products.component';

describe('CardProductsComponent', () => {
  let component: CardProductsComponent;
  let fixture: ComponentFixture<CardProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
