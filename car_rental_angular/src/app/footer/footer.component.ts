import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
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
  

  navbar = [
    {
      nameItem: 'Home',
      routerLink: 'home'
    },
    {
      nameItem: 'About us',
      routerLink: 'about'
    },
    {
      nameItem: 'Fleet',
      routerLink: 'fleet'
    },
    {
      nameItem: 'Services',
      routerLink: 'services'
    },
    {
      nameItem: 'Car Brands',
      routerLink: 'car_brands'
    },
    {
      nameItem: 'Contact us',
      routerLink: 'contact'
    },
  ]

  fleet = [
    {
      typeCar: 'Sports Cars',
      linkToType: 'https://www.google.com/'
    },
    {
      typeCar: 'SUVs Cars',
      linkToType: 'https://www.google.com/'
    },
    {
      typeCar: 'Luxury Cars',
      text: 'For those who appreciate luxury and comfort, we offer an extraordinary collection of high-end vehicles from prestigious brands such as Rolls-Royce and Maserati. Each car exemplifies the art of engineering and design, providing an exceptional experience for both drivers and passengers. With opulent interiors and modern technology, these vehicles are perfect for anyone looking to travel in style and sophistication.',
      imageType: 'luxury_img.png',
      linkToType: 'https://www.google.com/'
    },
    {
      typeCar: 'Convertibles Cars',
      linkToType: 'https://www.google.com/'
    },
    {
      typeCar: 'Electric Cars',
      linkToType: 'https://www.google.com/'
    },
    {
      typeCar: 'All Cars',
      linkToType: 'https://www.google.com/'
    }
  ]
}
