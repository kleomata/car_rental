import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthenticationService, GetCarResponse } from '../../AuthentiactionPackage/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'


@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit, AfterViewInit{
  carDetails: GetCarResponse | null = null;
  carId!: string;

  constructor(@Inject(PLATFORM_ID) private platormId: Object,
  private authService: AuthenticationService, 
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('carId') || '';
    this.getCarDetails();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platormId)) {
      setTimeout(() => {
        const thumbsSwiperCarDetails = new Swiper('.thumbs-swiper-seller-carDetails',{
          slidesPerView: 5,
          spaceBetween: 10,
          loop: true,
          watchSlidesProgress: true,
          slideToClickedSlide: true
        })
       

        const swiper = new Swiper('.swiper-seller-carDetails', {
          loop: true,
          speed: 1000,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //autoplay: {
            //delay: 1000,
            //disableOnInteraction: false,
          //},
          thumbs: {
            swiper: thumbsSwiperCarDetails
          },
        });
      }, 100); 
    }
  }
  

  getCarDetails(): void {
    this.authService.getCarById(this.carId).subscribe(
      (data) => {
        this.carDetails = data; 
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }
}
