import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

@Component({
  selector: 'app-swiper-home-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './swiper-home-section.component.html',
  styleUrl: './swiper-home-section.component.css'
})
export class SwiperHomeSectionComponent implements AfterViewInit{
  slides = [
    {
      brand: "Audi",
      type: "A1 2019",
      image: "audi-A1-2019.png",
      logo_image: "audi_logo.png",
      daily_price: "$100",
      engine_capacity: "1.0 / 2.0L",
      doors: "3 - 5",
      seats: "4 - 5",
      fuel_type: "Gasoline",
      year_of_manufacture: "2019",
      top_speed: "200 km/h"
    },
    {
      brand: "BMW",
      type: "X5 xDrive40i",
      image: "BMW-X5-xDrive40i-2022.png",
      logo_image: "bmw_logo.png",
      daily_price: "$200",
      engine_capacity: "3.0L",
      doors: "5",
      seats: "5 - 7",
      fuel_type: "Gasoline",
      year_of_manufacture: "2022",
      top_speed: "250 km/h"
    },
    {
      brand: "Ford",
      type: "Mustang EcoBoost",
      image: "Ford-Mustang-EcoBoost-2021.png",
      logo_image: "ford_logo.png",
      daily_price: "$110",
      engine_capacity: "2.3L",
      doors: "2",
      seats: "4",
      fuel_type: "Gasoline",
      year_of_manufacture: "2021",
      top_speed: "240 km/h"
    },
    {
      brand: "Mercedes Benz",
      type: "GLC 300",
      image: "Mercedes-Benz-GLC-300-2020.png",
      logo_image: "mercedes_benz_logo.png",
      daily_price: "$160",
      engine_capacity: "2.0L",
      doors: "5",
      seats: "5",
      fuel_type: "Gasoline",
      year_of_manufacture: "2020",
      top_speed: "230 km/h"
    },
    {
      brand: "Nissan",
      type: "Altima SR",
      image: "nissan-altima-sr-2021.png",
      logo_image: "nissan_logo.png",
      daily_price: "$70",
      engine_capacity: "2.0L",
      doors: "4",
      seats: "5",
      fuel_type: "Gasoline",
      year_of_manufacture: "2021",
      top_speed: "210 km/h"
    },
    {
      brand: "Volvo",
      type: "X90 T6",
      image: "Volvo-XC90-T6-2022.png",
      logo_image: "volvo_logo.png",
      daily_price: "$190",
      engine_capacity: "2.0L",
      doors: "5",
      seats: "7",
      fuel_type: "Gasoline",
      year_of_manufacture: "2022",
      top_speed: "230 km/h"
    }
  ]

  constructor(@Inject(PLATFORM_ID) private platormId: Object) {}

  ngAfterViewInit(){
    if(isPlatformBrowser(this.platormId)) {
      const swiper = new Swiper('.swiper-most-selling', {
        loop: true,
        speed: 1000,
        //effect: 'fade',
        //direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          //bulletClass: '.bullet',
          clickable: true,
          //dynamicBullets: true
          //type: 'progressbar',
          
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          
        },
        ///autoplay: {
          //delay: 1000,
          //disableOnInteraction: false
        //}
      })
    }
  }

}
