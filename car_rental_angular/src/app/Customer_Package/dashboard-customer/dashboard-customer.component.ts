import { Component, OnInit } from '@angular/core';
import { AuthenticationService, GetCustomerResponse } from '../../AuthentiactionPackage/authentication.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.css'
})
export class DashboardCustomerComponent implements OnInit{

  constructor (private authService: AuthenticationService) {}

  ngOnInit(): void {
      this.getCustomerProfile()
  }

  customerProfile: GetCustomerResponse | null = null 

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
}
