import { Component, OnInit } from '@angular/core';
import { AuthenticationService, GetSellerResponse } from '../../AuthentiactionPackage/authentication.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard-seller',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-seller.component.html',
  styleUrl: './dashboard-seller.component.css'
})
export class DashboardSellerComponent implements OnInit{
  seller: GetSellerResponse | null = null;
  
  sellerName: string = '';
  sellerLastName: string = '';
  sellerEmail: string = '';
  sellerUsername: string = '';
  sellerId: string = '';
  sellerTel: string = '';
  sellerLocation: string = '';
  
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
   // const sellerId = this.route.snapshot.paramMap.get('id');
    //if (sellerId) {
    this.loadSeller();
    //}
  }

  loadSeller(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getSellerById(token).subscribe({
        next: (response) => {
          this.sellerName = response.nameSeller; 
          this.sellerEmail = response.emailSeller; 
          this.sellerId = response.id;
          this.sellerLastName = response.lastnameSeller;
          this.sellerTel = response.telSeller;
          this.sellerUsername = response.username;
          this.sellerLocation = response.locationSeller;
          
        },
        error: (err) => {
          console.error("Error fetching seller data:", err);
        }
      });
    }
  }
}
