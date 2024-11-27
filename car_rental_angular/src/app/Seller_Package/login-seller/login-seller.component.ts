import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../AuthentiactionPackage/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-seller',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-seller.component.html',
  styleUrl: './login-seller.component.css'
})
export class LoginSellerComponent {
  loginSellerForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private tokenService: AuthenticationService
  ) {
    this.loginSellerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.loginSellerForm.valid) {
      const {username, password} = this.loginSellerForm.value;
      console.log('Dergimi i kredencialeve:', { username, password }); // Shtoni këtë linjë për debugging
      this.authService.loginSeller(username, password).subscribe(
        response => {
          console.log('Login succesful', response)
          this.router.navigate(['/seller-home'])
          this.tokenService.saveToken(response.token)
        },
        error => {
          console.error('Login Failed', error);
        }
      )
    }
  }
}
