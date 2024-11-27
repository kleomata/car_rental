import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService, CreateSellerRequest } from '../../AuthentiactionPackage/authentication.service';
//import { error } from 'console';

@Component({
  selector: 'app-create-seller',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-seller.component.html',
  styleUrl: './create-seller.component.css'
})
export class CreateSellerComponent {
  
  constructor(private authService: AuthenticationService){}

  seller: CreateSellerRequest = {
    nameSeller: '',
    lastnameSeller: '',
    emailSeller: '',
    telSeller: '',
    locationSeller: '',
    username: '',
    passwordSeller: '' 
  }

  onSubmit() {
    const token = this.authService.getToken();

    if(token) {
      this.authService.createSeller(this.seller, token).subscribe({
        next: (response) => {
          console.log("Seller created Successfully: ", response);

          this.resetForm();
        },
        error: (error) =>{
          console.error("Error Seller: ", error);
        }
      });
    } else {
      console.error("No toke found");
    }
  }

  resetForm() {
    this.seller = {
      nameSeller: '',
      lastnameSeller: '',
      emailSeller: '',
      telSeller: '',
      locationSeller: '',
      username: '',
      passwordSeller: ''
    };
  }

}
