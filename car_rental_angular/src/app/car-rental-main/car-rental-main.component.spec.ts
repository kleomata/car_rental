import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentalMainComponent } from './car-rental-main.component';

describe('CarRentalMainComponent', () => {
  let component: CarRentalMainComponent;
  let fixture: ComponentFixture<CarRentalMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarRentalMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRentalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
