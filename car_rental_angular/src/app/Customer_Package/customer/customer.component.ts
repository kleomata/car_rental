import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthenticationService } from '../../AuthentiactionPackage/authentication.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  constructor(private authService: AuthenticationService ) {}

  menu = [
    {
      name: 'Dashboard',
      icon: 'fa-solid fa-clipboard-user',
      routerLink: 'dashboard-customer'
    },
    {
      name: 'Reservation',
      icon: 'fa-regular fa-bookmark',
      routerLink: 'reservation-customer'
    }
  ]


  onLogoutCustomer() {
    this.authService.logoutCustomer().subscribe({
      next: (response) => {
        console.log('Logout successful', response);
        //localStorage.removeItem('token');
        //window.location.reload();
        //this.router.navigate(['/Urban-Elite/home'])
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }




}
