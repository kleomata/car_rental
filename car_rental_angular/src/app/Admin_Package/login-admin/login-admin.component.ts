import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AuthenticationService } from '../../AuthentiactionPackage/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})


export class LoginAdminComponent {

  loginAdminForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private tokenService: AuthenticationService
  ) {
    this.loginAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.loginAdminForm.valid) {
      const {username, password} = this.loginAdminForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          console.log('Login succesful', response)
          this.router.navigate(['/admin-home'])
          this.tokenService.saveToken(response.token)
        },
        error => {
          console.error('Login Failed', error);
        }
      )
    }
  }

}

