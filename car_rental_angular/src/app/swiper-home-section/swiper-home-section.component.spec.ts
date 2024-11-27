import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperHomeSectionComponent } from './swiper-home-section.component';

describe('SwiperHomeSectionComponent', () => {
  let component: SwiperHomeSectionComponent;
  let fixture: ComponentFixture<SwiperHomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperHomeSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperHomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
