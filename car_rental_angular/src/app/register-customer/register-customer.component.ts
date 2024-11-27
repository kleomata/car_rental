import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { AuthenticationService } from '../AuthentiactionPackage/authentication.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css'
})
export class RegisterCustomerComponent {
  currentStep: number = 1
  isSubmitted: boolean = false;

  register: FormGroup;

  constructor(private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.register = this.fb.group({
      nameCustomer: ['', Validators.required],
      lastnameCustomer: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      emailCustomer: ['', [Validators.required, Validators.email]],
      phoneCustomer: ['', Validators.required],
      location: ['', Validators.required],
      imageCustomer: [null, Validators.required],
      username: ['', Validators.required],
      passwordCustomer: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator
    })
  }

  private passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('passwordCustomer');
    const confirmPassword = formGroup.get('confirmPassword');
  
    if (confirmPassword && password && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
  

  selectedFile: File | null = null
  imagesPreviews: string | null = null;


  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if(file) {
      this.selectedFile = file;
      this.register.patchValue({imageCustomer: file})
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagesPreviews = e.target.result
      };
      reader.readAsDataURL(file)
    }
  }
  removeImage() {
    this.imagesPreviews = null;
    this.selectedFile = null;
    this.register.patchValue({imageCustomer: null})
  } 
  public isPictureSelected(): boolean {
    return !!this.selectedFile;
  }


  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.isFormValid(['nameCustomer', 'lastnameCustomer', 'birthdate', 'gender', 'emailCustomer', 'phoneCustomer', 'location']);
      case 2:
        return this.isPictureSelected();
      case 3:
        return this.isFormValid(['username', 'passwordCustomer', 'confirmPassword'])
      default:
        return false; 
    }
  } 

  private isFormValid(fields: string[]): boolean {
    return fields.every(field => this.register.get(field)?.valid);
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  isStepCurrent(step: number): boolean {
    return this.currentStep === step;
  }

  nextStep(): void {
    this.isSubmitted = true;

    if (this.isStepValid()) {
      if(this.currentStep < 3) {
        this.currentStep++;
        this.isSubmitted = false
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.isSubmitted = false; 
    }
  }

  registerForm() {
    const registerCustomer: any = {
      ...this.register.value,
      //imageCustomer: this.imagesPreviews 
    };

    if(this.selectedFile) {
      this.authService.registerCustomer(registerCustomer, this.selectedFile).subscribe({
        next: (response) => {
          console.log("Customer added successfully!");
            
          this.register.reset();
          this.currentStep = 1;
        },
        error: (error) => {
          console.error("Error adding customer: ", error);
        }
      });
    }
  
  }
}
