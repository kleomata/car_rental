import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthenticationService } from '../AuthentiactionPackage/authentication.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  constructor(private authService: AuthenticationService,
    private router: Router
  ){}

  menu = [
    {
      title: 'Dashboard',
      routerLink: 'dashboard'
    },
    {
      title: 'Create Seller',
      routerLink: 'create-seller'
    },
    {
      title: 'Edit Seller',
      routerLink: 'edit-seller'
    },
    {
      title: 'Delete Seller',
      routerLink: 'delete-seller'
    },
    {
      title: 'All Seller',
      routerLink: 'all-seller'
    },
    {
      title: 'Specific Seller',
      routerLink: 'specifice-seller'
    },
  ]


  onLogout() {
    this.authService.logout().subscribe({
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
