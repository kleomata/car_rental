import { Component } from '@angular/core';
import { SwiperHomeSectionComponent } from "../swiper-home-section/swiper-home-section.component";
import { NgFor, NgIf, NgClass } from '@angular/common';
import { SwiperBrandsComponent } from "../swiper-brands/swiper-brands.component";
import { SwiperTestimonialsComponent } from "../swiper-testimonials/swiper-testimonials.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SwiperHomeSectionComponent, NgFor, SwiperBrandsComponent, SwiperTestimonialsComponent, NgIf, NgClass, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
   socialMedia = [
    {
      icon: 'fa-brands fa-instagram',
      linkSocialMedia: 'https://www.instagram.com/'
    },
    {
      icon: 'fa-brands fa-facebook',
      linkSocialMedia: 'https://www.facebook.com/'
    },

    {
      icon: 'fa-brands fa-x-twitter',
      linkSocialMedia: 'https://x.com/i/flow/login'
    },

    {
      icon: 'fa-brands fa-tiktok',
      linkSocialMedia: 'https://www.tiktok.com/login'
    },

    {
      icon: 'fa-brands fa-pinterest',
      linkSocialMedia: 'https://www.pinterest.com/'
    }
  ]

  stepsAbout = [
    {
      icon: 'fa-solid fa-location-dot',
      titleStep: 'Choose a location',
      textStep: 'Select the pickup location of the car.'
    },
    {
      icon: 'fa-solid fa-calendar-days',
      titleStep: 'Select a date',
      textStep: 'Select the date of the car rental.'
    },
    {
      icon: 'fa-solid fa-car',
      titleStep: 'Find the right car',
      textStep: 'Choose the perfect car for your needs.'
    },
    {
      icon: 'fa-regular fa-circle-check',
      titleStep: 'Book a car',
      textStep: 'Ready! Now you can go on the adventure.'
    },
  ]
  

  services = [
    {
      icon: 'fa-solid fa-tag',
      titleService: 'Deals for every budget',
      textService: 'Explore various car rental options that fit every budget. Whether you need a compact car or a spacious vehicle, we have you covered.',
    },
    {
      icon: 'fa-solid fa-hand-holding-dollar',
      titleService: 'Best price guaranteed',
      textService: 'We guarantee the best prices on rentals, ensuring you get great value. Rent with confidence, knowing you’re getting a deal.',
    },
    {
      icon: 'fa-solid fa-headset',
      titleService: 'Support 24/7',
      textService: 'Our support team is available 24/7 to assist you with inquiries. We’re here to ensure your experience is smooth and enjoyable.',
    },
    {
      icon: 'fa-solid fa-rotate',
      titleService: 'Flexible cancellation policies',
      textService: 'Enjoy flexible cancellation options that let you modify or cancel your booking easily, giving you peace of mind for any changes.',
    },
    {
      icon: 'fa-solid fa-car-side',
      titleService: 'Wide selection of vehicles',
      textService: 'Choose from a wide range of vehicles, including economy cars and SUVs, tailored to meet all your travel needs and preferences.',
    },
    {
      icon: 'fa-solid fa-map-location-dot',
      titleService: 'Convenient pickup and drop-off',
      textService: 'Benefit from multiple pickup and drop-off locations, making it easy to collect and return your rental car wherever you need.',
    }
  ];

  // ================ Fleet 

  fleets = [
    {
      typeCar: 'Sports Cars',
      text: 'Discover an exhilarating world of high-performance sports cars from iconic brands like Lamborghini and Ferrari. These vehicles are engineered for those who crave speed and agility, boasting powerful engines and cutting-edge technology. Each model offers a unique driving experience, delivering unparalleled adrenaline on every turn. With stunning designs and top-tier features, our sports cars stand out on any road, making them the ultimate choice for thrill-seekers.',
      imageType: 'sport_img.png',
      linkToType: '/Urban-Elite/fleet'
    },
    {
      typeCar: 'SUVs Cars',
      text: 'Explore the power and versatility of our luxury SUVs, including the Mercedes G-Wagon and Lamborghini Urus. These vehicles offer ample space and comfort, making them ideal for families or outdoor adventures. Combining speed and stability, our SUVs are well-suited for any terrain, ensuring that every journey is enjoyable and safe.',
      imageType: 'suv_img.png',
      linkToType: '/Urban-Elite/fleet'
    },
    {
      typeCar: 'Luxury Cars',
      text: 'For those who appreciate luxury and comfort, we offer an extraordinary collection of high-end vehicles from prestigious brands such as Rolls-Royce and Maserati. Each car exemplifies the art of engineering and design, providing an exceptional experience for both drivers and passengers. With opulent interiors and modern technology, these vehicles are perfect for anyone looking to travel in style and sophistication.',
      imageType: 'luxury_img.png',
      linkToType: '/Urban-Elite/fleet'
    },
    {
      typeCar: 'Convertibles Cars',
      text: 'For those seeking the freedom of open-air driving, our exclusive collection of convertibles is the perfect choice. With the ability to easily transition from a closed car to an open one, these vehicles provide a unique experience for every trip. Ideal for sunny days, our convertibles blend style and performance, allowing you to enjoy the road like never before.',
      imageType: 'covertibles_img.png',
      linkToType: '/Urban-Elite/fleet'
    },
    {
      typeCar: 'Electric Cars',
      text: 'The future of mobility is here with our selection of electric cars. These vehicles offer a sustainable and efficient alternative for those looking to reduce their carbon footprint. Equipped with advanced technology, electric cars provide impressive speed and a quiet driving experience, making them suitable for both city commutes and longer journeys.',
      imageType: 'electric_img.png',
      linkToType: '/Urban-Elite/fleet'
    },
    {
      typeCar: 'All Cars',
      text: 'Browse our complete inventory of vehicles, where you\'ll find a wide variety to meet every need and preference. From speedy sports cars to powerful SUVs and luxurious vehicles, we offer options for every type of driver. Each vehicle is designed to deliver performance and comfort, ensuring that every journey is unforgettable.',
      imageType: 'all_car_img.png',
      linkToType: '/Urban-Elite/fleet'
    }
  ]




  // ======================================

  faqs = [
    { 
      question: 'What services does Urban Elite Car Rental offer?', 
      answer: 'Urban Elite Car Rental provides a wide range of vehicle rental services including economy, luxury, and SUV rentals. We cater to both short-term and long-term rentals, ensuring you have access to a vehicle that suits your needs, whether for a weekend getaway or an extended business trip. Additionally, we offer services like airport pick-up and drop-off, 24/7 roadside assistance, and customizable rental options to enhance your experience.', 
      isOpen: false 
    },
    { 
      question: 'How can I make a reservation with Urban Elite Car Rental?', 
      answer: 'Making a reservation with Urban Elite Car Rental is simple! You can book online through our user-friendly website by selecting your desired vehicle, rental dates, and any additional services you may need. Alternatively, you can call our customer service team for assistance. We recommend booking in advance to secure the best rates and ensure availability, especially during peak seasons.', 
      isOpen: false 
    },
    { 
      question: 'What are the payment options available?', 
      answer: 'At Urban Elite Car Rental, we offer multiple payment options for your convenience. You can pay using major credit cards, debit cards, and even cash in some locations. When booking online, a valid credit card is usually required to hold your reservation. Make sure to check the specific payment policies applicable to your rental location.', 
      isOpen: false 
    },
    { 
      question: 'Is insurance included in my rental?', 
      answer: 'Insurance coverage is not automatically included in your rental agreement with Urban Elite Car Rental. However, we offer several insurance options that you can add to your rental for extra protection against potential damages or accidents. We recommend reviewing your personal insurance policy or credit card benefits to see if they provide coverage for rental vehicles before deciding on additional insurance.', 
      isOpen: false 
    },
    { 
      question: 'Can I pick up and drop off my rental car at different locations?', 
      answer: 'Yes, Urban Elite Car Rental offers flexible pick-up and drop-off options. You can choose to pick up your rental car at one location and return it to another, which is particularly convenient for one-way trips. Please note that there may be an additional fee for this service, so it’s best to confirm with us at the time of booking.', 
      isOpen: false 
    },
    { 
      question: 'What are the age requirements for renting a vehicle?', 
      answer: 'The minimum age to rent a vehicle from Urban Elite Car Rental is 21 years old. Drivers aged 21 to 24 may be subject to a young driver surcharge. Additionally, drivers must possess a valid driver’s license and have a credit card in their name. For specific vehicles, such as luxury cars, the minimum age may be higher. Please check our policies or contact customer service for detailed information.', 
      isOpen: false 
    },
    { 
      question: 'What should I do if I have a problem with my rental car?', 
      answer: 'If you experience any issues with your rental car, such as mechanical problems or accidents, contact Urban Elite Car Rental immediately. Our 24/7 roadside assistance team is ready to help with any emergencies, including flat tires, battery issues, or vehicle breakdowns. We take your safety seriously and will work to resolve any problems as quickly as possible.', 
      isOpen: false 
    },
    { 
      question: 'What is the fuel policy for my rental car?', 
      answer: 'Urban Elite Car Rental typically operates on a full-to-full fuel policy, meaning you will receive your rental car with a full tank of gas and are expected to return it full. This policy helps ensure you only pay for the fuel you use. If you return the car with less fuel, you may incur additional refueling charges. Always double-check the fuel level before returning your vehicle.', 
      isOpen: false 
    },
    { 
      question: 'Can I add additional drivers to my rental agreement?', 
      answer: 'Yes, you can add additional drivers to your rental agreement at Urban Elite Car Rental. Additional drivers must meet the same requirements as the primary driver, including age and having a valid driver’s license. There may be an extra fee for each additional driver, so be sure to specify this at the time of booking.', 
      isOpen: false 
    },
    { 
      question: 'What happens if I return my car late?', 
      answer: 'Returning your car late may result in extra charges at Urban Elite Car Rental. We typically allow a grace period of up to 30 minutes, but if you exceed this time, you may be charged for an additional day or hourly fees. To avoid these charges, please plan your return carefully and communicate with us if you anticipate being late.', 
      isOpen: false 
    },
    { 
      question: 'Are there any restrictions on where I can drive my rental car?', 
      answer: 'While Urban Elite Car Rental allows you to drive within the country, some restrictions may apply, especially regarding off-road driving or driving into certain areas. It’s important to check our rental policies for any geographical restrictions to avoid penalties. If you plan on taking your rental vehicle across state lines or into restricted areas, please inform us at the time of rental.', 
      isOpen: false 
    },
    { 
      question: 'How can I contact Urban Elite Car Rental for support?', 
      answer: 'You can contact Urban Elite Car Rental through our website’s customer support page, where you will find our phone number and email address. Our customer service team is available to assist you with any inquiries or concerns. Additionally, you can reach out to us via our social media channels for quick support and updates.', 
      isOpen: false 
    },
    { 
      question: 'What is the cancellation policy for my reservation?', 
      answer: 'Urban Elite Car Rental offers a flexible cancellation policy, allowing you to cancel your reservation without any fees if done within a specified time frame. However, this may vary depending on the type of reservation you make. Be sure to read the cancellation policy carefully at the time of booking and contact us if you have any questions.', 
      isOpen: false 
    },
    { 
      question: 'What should I do if I lose my rental car keys?', 
      answer: 'If you lose your rental car keys, contact Urban Elite Car Rental immediately for assistance. We will help you arrange for a replacement key. Please be aware that there may be a fee associated with key replacement, and the process can take some time. To prevent this issue, keep the keys in a secure location during your rental period.', 
      isOpen: false 
    },
    { 
      question: 'Can I rent a car if I’m not a resident of the country?', 
      answer: 'Yes, Urban Elite Car Rental welcomes international customers. However, you will need to present a valid driver’s license, a passport, and a credit card. Some rental locations may require an International Driving Permit (IDP) in addition to your regular driver’s license. Please check the specific requirements at your chosen rental location to ensure a smooth rental process.', 
      isOpen: false 
    }
  ];


  currentFaqIndex: number | null = null

  toggleAnswer(index: number): void {
      if(this.currentFaqIndex === index){
        this.currentFaqIndex = null
      } else {
        this.currentFaqIndex = index
      }

      this.faqs.forEach((faq, i) => {
        faq.isOpen = i === this.currentFaqIndex
      })
  }


}

