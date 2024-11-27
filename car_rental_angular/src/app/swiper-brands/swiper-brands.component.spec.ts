import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperBrandsComponent } from './swiper-brands.component';

describe('SwiperBrandsComponent', () => {
  let component: SwiperBrandsComponent;
  let fixture: ComponentFixture<SwiperBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
