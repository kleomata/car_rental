import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCustomerComponent } from './reservation-customer.component';

describe('ReservationCustomerComponent', () => {
  let component: ReservationCustomerComponent;
  let fixture: ComponentFixture<ReservationCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
