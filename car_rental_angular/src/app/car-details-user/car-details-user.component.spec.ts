import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsUserComponent } from './car-details-user.component';

describe('CarDetailsUserComponent', () => {
  let component: CarDetailsUserComponent;
  let fixture: ComponentFixture<CarDetailsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
