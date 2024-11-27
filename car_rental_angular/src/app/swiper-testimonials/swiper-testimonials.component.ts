import { isPlatformBrowser, NgFor } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'

@Component({
  selector: 'app-swiper-testimonials',
  standalone: true,
  imports: [NgFor],
  templateUrl: './swiper-testimonials.component.html',
  styleUrl: './swiper-testimonials.component.css'
})
export class SwiperTestimonialsComponent implements AfterViewInit{

  testimonials = [
    {
      profileImage: 'profile_user.png',
      name: 'John Smith',
      rating: 5,
      comment: 'I had an amazing experience renting a car from this service! The process was seamless from start to finish. The staff was incredibly friendly and helped me choose the perfect vehicle for my trip. The car was in excellent condition, and the rates were very reasonable. I highly recommend this service for anyone needing a rental car!'
    },
    {
      profileImage: 'profile_user.png',
      name: 'Emma Johnson',
      rating: 5,
      comment: 'This car rental service exceeded my expectations! The booking process was simple, and the customer service team was always available to answer my questions. The car I rented was spotless and drove beautifully. I appreciated the flexibility they offered for drop-off times, which made my trip much more enjoyable.'
    },
    {
      profileImage: 'profile_user.png',
      name: 'Michael Brown',
      rating: 4,
      comment: 'I had a fantastic experience with this car rental company! The staff was knowledgeable and helped me find the right car for my family vacation. The vehicle was spacious and comfortable, perfect for our road trip. I will definitely be using their services again in the future!'
    },
    {
      profileImage: 'profile_user.png',
      name: 'Sophia Davis',
      rating: 5,
      comment: 'Renting a car from this company was one of the best decisions I made for my trip! The online booking system was user-friendly, and I received immediate confirmation. The car was in pristine condition, and the pick-up and drop-off were hassle-free. Highly recommend for anyone looking for reliable car rental!'
    },
    {
      profileImage: 'profile_user.png',
      name: 'David Wilson',
      rating: 5,
      comment: 'What a great experience with this car rental service! The team was friendly and efficient, making the entire process quick and easy. I was impressed by the variety of cars available, and the one I chose was perfect for my needs. I’ll definitely be coming back for my next trip!'
    },
    {
      profileImage: 'profile_user.png',
      name: 'Olivia Martinez',
      rating: 5,
      comment: 'I couldn’t be happier with my car rental experience! The staff went above and beyond to ensure I had everything I needed. The car was clean and well-maintained, making my travels stress-free. This is the go-to car rental service for anyone visiting the area!'
    },
    {
      profileImage: 'profile_user.png',
      name: 'Liam Garcia',
      rating: 5,
      comment: 'Absolutely loved my experience with this rental service! The customer support was top-notch, helping me every step of the way. The car was reliable and very comfortable. It truly enhanced my travel experience, and I highly recommend them to anyone in need of a vehicle!'
    }
  ];




  constructor(@Inject(PLATFORM_ID) private platormId: Object) {}

  ngAfterViewInit(){
    if(isPlatformBrowser(this.platormId)) {
      const swiper = new Swiper('.swiper-testimonials', {
        loop: true,
        speed: 1000,
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 30,
        mousewheel: false,
        allowTouchMove: false,
        //effect: 'fade',
        //direction: 'vertical',
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
