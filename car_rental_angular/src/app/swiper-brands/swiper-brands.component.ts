import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'

@Component({
  selector: 'app-swiper-brands',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './swiper-brands.component.html',
  styleUrl: './swiper-brands.component.css'
})
export class SwiperBrandsComponent implements AfterViewInit{

  brands = [
    {
      logo: 'ford_logo.png',
      nameBrand: 'Ford',
      link: 'https://dribbble.com/shots/14608207-Car-rental-website',
    },
    {
      logo: 'bmw_logo.png',
      nameBrand: 'BMW'
    },
    {
      logo: 'mercedes_benz_logo.png',
      nameBrand: 'Mercedes Benz'
    },
    {
      logo: 'nissan_logo.png',
      nameBrand: 'Nissan'
    },
    {
      logo: 'volvo_logo.png',
      nameBrand: 'Volvo'
    },
    {
      logo: 'audi_logo.png',
      nameBrand: 'Audi'
    },
    {
      logo: 'ford_logo.png',
      nameBrand: 'Ford',
      link: 'https://dribbble.com/shots/14608207-Car-rental-website',
    },
    {
      logo: 'bmw_logo.png',
      nameBrand: 'BMW'
    },
    {
      logo: 'mercedes_benz_logo.png',
      nameBrand: 'Mercedes Benz'
    },
    {
      logo: 'nissan_logo.png',
      nameBrand: 'Nissan'
    },
    {
      logo: 'volvo_logo.png',
      nameBrand: 'Volvo'
    },
    {
      logo: 'audi_logo.png',
      nameBrand: 'Audi'
    },
  ]

  pagedBrands: any[][] = [];
  itemsPerPage = 5; 


    constructor(@Inject(PLATFORM_ID) private platormId: Object) {
        this.paginateBrands();
    }


    ngAfterViewInit(){
    if(isPlatformBrowser(this.platormId)) {
      const swiper = new Swiper('.swiper-brand', {
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        slidesPerGroup: 1,
        mousewheel: false,
        allowTouchMove: false,
        //effect: 'fade',
        //direction: 'vertical',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          
        },
        //autoplay: {
          //delay: 3000,
          //disableOnInteraction: false
        //},
      })
    }
  }
  paginateBrands() {
    for (let i = 0; i < this.brands.length; i += this.itemsPerPage) {
      this.pagedBrands.push(this.brands.slice(i, i + this.itemsPerPage));
    }
  }
}

