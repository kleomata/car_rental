import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
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

}
