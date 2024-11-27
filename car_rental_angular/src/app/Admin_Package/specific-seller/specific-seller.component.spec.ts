import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSellerComponent } from './specific-seller.component';

describe('SpecificSellerComponent', () => {
  let component: SpecificSellerComponent;
  let fixture: ComponentFixture<SpecificSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificSellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
