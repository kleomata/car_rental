import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperTestimonialsComponent } from './swiper-testimonials.component';

describe('SwiperTestimonialsComponent', () => {
  let component: SwiperTestimonialsComponent;
  let fixture: ComponentFixture<SwiperTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperTestimonialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
