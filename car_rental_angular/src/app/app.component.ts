import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { CarRentalMainComponent } from "./car-rental-main/car-rental-main.component";
import { SwiperHomeSectionComponent } from "./swiper-home-section/swiper-home-section.component";
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterCustomerComponent } from "./register-customer/register-customer.component";
import { NgIf } from '@angular/common';
import { LoginCustomerComponent } from "./login-customer/login-customer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CarRentalMainComponent, SwiperHomeSectionComponent, RegisterCustomerComponent, NgIf, LoginCustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AppComponent {
  title = 'car_rental_angular';
}
