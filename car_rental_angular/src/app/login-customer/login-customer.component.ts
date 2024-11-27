import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../AuthentiactionPackage/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-customer.component.html',
  styleUrl: './login-customer.component.css'
})
export class LoginCustomerComponent {

  loginCustomerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.loginCustomerForm = this.fb.group({
      username: ['', Validators.required],
      passwordCustomer: ['', Validators.required]
    })
  }


  loginCustomer() {
    if (this.loginCustomerForm.valid) {
      const {username, passwordCustomer} = this.loginCustomerForm.value;
      console.log("Kredencialet: ", {username, passwordCustomer});
      this.authService.loginCustomer(username, passwordCustomer).subscribe(
        response => {
          console.log('Login Customer Succesful', response)
          this.router.navigate(['/Urban-Elite/home'])
          this.authService.saveToken(response.token)
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        error => {
          console.error('Login Failed', error);
        }
      )
    }
  }


}
