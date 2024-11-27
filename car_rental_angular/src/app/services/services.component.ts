import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {


  services = [
    {
      image: 'deals_for_every_budget_img.jpg',
      serviceTitle: 'Deals for every budget',
      serviceText: 'We understand that every customer has unique needs and a specific budget. That’s why we offer a wide variety of options that cater to all styles and requirements. Whether you’re traveling for business, planning a short family getaway, or embarking on a weekend adventure with friends, we have solutions that fit every financial situation. With our ongoing deals and seasonal promotions, you can select the vehicle you need without exceeding your budget. All of this is made simple and clear through an easy booking process.',
    },
    {
      image: 'best_price_guaranteed_img.jpg',
      serviceTitle: 'Best price guaranteed',
      serviceText: 'We know how important it is for you to feel secure in your investment. That’s why we provide a strong guarantee for the best prices in the market. If you find a lower price for the same vehicle and conditions, we will match that price without hesitation. This is part of our commitment to providing you with the highest value for your money. We constantly update our prices to ensure you’re getting the best possible offers and to optimize your rental experience.',
    },
    {
      image: 'support_24_7_img.jpg',
      serviceTitle: 'Support 24/7',
      serviceText: 'We understand that travel can bring unexpected challenges, and sometimes assistance is needed at the most unexpected times. Our support team is trained to provide quick and efficient help, whether it’s for questions about your booking, information regarding your vehicle, or assistance in case of emergencies. We are available every day and night, offering support through phone, email, and live chat. Our goal is to ensure you have a smooth and worry-free experience.',
    },
    {
      image: 'flexible_cancellation_policies_img.jpg',
      serviceTitle: 'Flexible cancellation policies',
      serviceText: 'Life can be unpredictable, and we understand that. Our flexible cancellation policies allow you to make changes to your reservation without feeling locked in. If your plans change, you can cancel or modify your booking up to the last minute, without any hidden fees. This is our way of providing you with peace of mind, allowing you to plan your trip confidently without the fear of financial loss.',
    },
    {
      image: 'wide_selection_of_vehicles_img.jpeg',
      serviceTitle: 'Wide selection of vehicles',
      serviceText: 'We know that choosing the right vehicle is crucial for an enjoyable trip. That’s why we offer a broad range of vehicles that vary from the most economical and fuel-efficient models to spacious SUVs for families and luxury cars for those seeking a special experience. Each vehicle is equipped with the latest technologies for safety and comfort, providing you with an exceptional travel experience. Moreover, we offer options to customize your experience with various accessories like GPS, child seats, and more.',
    },
    {
      image: 'convenient_pickup_and_drop-off_img.jpg',
      serviceTitle: 'Convenient pickup and drop-off',
      serviceText: 'We recognize that the logistics of picking up and returning vehicles can be cumbersome, which is why we provide a wide network of locations for vehicle pick-up and drop-off. You can choose from options at airports, train stations, and other strategic locations to ensure you don’t waste a precious minute of your journey. Each location is easily accessible and staffed with trained personnel to assist you with any needs. This allows you to spend more time enjoying your destination and less time worrying about logistics.',
    },
  ]

}
