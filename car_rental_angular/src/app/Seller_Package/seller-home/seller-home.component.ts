import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../AuthentiactionPackage/authentication.service';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  constructor(private authService: AuthenticationService){}


  menu = [
    {
      title: 'Dashboard',
      routerLink: 'dashboard'
    },
    {
      title: 'Add Car',
      routerLink: 'add-car'
    },
    {
      title: 'All Car',
      routerLink: 'all-cars'
    },
    {
      title: 'Reservation',
      routerLink: 'reservation-seller'
    }
  ]

  onLogoutSeller() {
    this.authService.logoutSeller().subscribe({
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
