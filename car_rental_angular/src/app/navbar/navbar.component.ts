import { Component, HostListener, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterCustomerComponent } from "../register-customer/register-customer.component";
import { LoginCustomerComponent } from "../login-customer/login-customer.component";
import { AuthenticationService, GetCustomerResponse } from '../AuthentiactionPackage/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, RouterLink, RouterLinkActive, RegisterCustomerComponent, LoginCustomerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean = false
  customer: any;

  constructor(private authService: AuthenticationService) {
    this.checkLoginStatus()
  }

  ngOnInit(): void {
    this.checkLoginStatus()
    this.getCustomerProfile();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn) {
      this.customer = ''
    }
  }

  customerProfile: GetCustomerResponse | null = null 
 // customerImageUrl: string | null = null;

  getCustomerProfile(): void {
    const token = localStorage.getItem('token')
    if(token) {
      this.authService.getCustomerByUsername().subscribe({
        next: (response) => {
          this.customerProfile = response
          this.loadCustomerImage(); 
        },
        error: (err) => {
          console.error("Error fetching seller data:", err);
        }
      })
    }
  }
 /* loadCustomerImage(): void {
    if (this.customerProfile?.imageCustomer) {
      this.customerImageUrl = this.customerProfile.imageCustomer;
    } else {
      this.customerImageUrl = null; 
    }
  }
  */
  customerImageUrl: string | null = null;

  loadCustomerImage(): void {
    if (this.customerProfile?.imageCustomer) {
        this.authService.getImage(this.customerProfile.imageCustomer).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                this.customerImageUrl = url;
            },
            error: (err) => {
                console.error("Error fetching image:", err);
                this.customerImageUrl = null;
            }
        });
    } else {
        this.customerImageUrl = null; 
    }
}

  



  registerShow: boolean = false
  loginShow: boolean = false

  showRegister() {
    this.registerShow = true
  }
  showLogin() {
    this.loginShow = true
  }


  hideRegister() {
    this.registerShow = false
  }


  isScrolledBackground: boolean = false;
  isScrolledPosition: boolean = false;

  @HostListener('window:scroll',[])
  onWindowScroll(){
    this.isScrolledPosition = window.scrollY > 40;
    this.isScrolledBackground = window.scrollY > window.innerHeight;
  }

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
      routerLink: 'about-us'
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
      routerLink: 'brands'
    },
    {
      nameItem: 'Contact us',
      routerLink: 'contact-us'
    },
  ]

  
}
