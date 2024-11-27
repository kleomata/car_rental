  import { Component } from '@angular/core';
  import { AddCarRequest, AuthenticationService, GetCarResponse } from '../../AuthentiactionPackage/authentication.service';
  import { ReactiveFormsModule, FormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
  import { NgFor, NgClass } from '@angular/common';

  @Component({
    selector: 'app-add-car',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgFor, NgClass],
    templateUrl: './add-car.component.html',
    styleUrl: './add-car.component.css'
  })
  export class AddCarComponent {

    carForm: FormGroup; 


    optionsCar: string[] = [
      "Cruise Control","3D Surround Camera", "Memory Front Seats", "Blind Spot Warning", "Parking Assist", "Adaptive Cruise Control", "Digital HUD", "Temperature Controlled Seats",
      "Built-in GPS", "Sunroof / Moonroof", "Reverse Camera", "Parking Sensors", "Steering Assist", "Day-time Running Lights", "Touchscreen LCD", "Paddle Shift (Triptronic)",
      "Powered Tailgate", "Power Seats", "LCD Screens", "Leather Seats", "Air Suspension", "Gesture Control", "Push Button Ignition", "SRS Airbags",
      "Front & Rear Airbags", "Front Air Bags", "ABS", "Bluetooth", "Premium Audio", "Rear AC", "Power Mirrors", "Power Windows", "Seat Belt Reminder",
      "Fabric Seats", "Alloy Wheels", "USB", "Apple CarPlay", "Android Auto", "Foldable Armrest", "Butterfly Doors", "Fog Lights", "Massaging Seats", "FM Radio"
    ]
    selectedOptions: string[] = [];

    toggleOption(option: string): void {
      if (this.selectedOptions.includes(option)) {
        this.selectedOptions = this.selectedOptions.filter(opt => opt !== option);
      } else {
        this.selectedOptions.push(option);
      }
      this.carForm.get('selectedOptions')?.setValue(this.selectedOptions);
    }
    
    isChecked(option: string): boolean {
      return this.selectedOptions.includes(option);
    }

    selectedFiles: File[] = [];
    imagePreviews: { name: string; url: string }[] = [];

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push({
          name: file.name,
          url: e.target.result 
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(fileToRemove: { name: string; url: string }) {
    this.imagePreviews = this.imagePreviews.filter(file => file.url !== fileToRemove.url);
    this.selectedFiles = this.selectedFiles.filter(file => file.name !== fileToRemove.name);
  }

  

  constructor(private authService: AuthenticationService, private fb: FormBuilder) {
    this.carForm = this.fb.group({ 
      brand: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      yearofmanufacture: [0, [Validators.required, Validators.min(1886)]],
      seats: [0, [Validators.required, Validators.min(1)]],
      doors: [0, [Validators.required, Validators.min(1)]],
      baggages: [0, [Validators.required, Validators.min(0)]],
      transmission: ['', Validators.required],
      priceperday: ['', Validators.required],
      mileagekm: [0, [Validators.required, Validators.min(0)]],
      engine: ['', Validators.required],
      color: ['', Validators.required],
      describecar: ['', Validators.required],
      //imagescar: [[]], 
      moreoptions: [[]] 
    });
  }

  addCarBtn() {
    if (this.carForm.valid) {
      const token = this.authService.getToken();
      const carData: AddCarRequest = { 
        ...this.carForm.value, 
        moreoptions: this.selectedOptions
      };

      if (token) {
        this.authService.addCar(carData, Array.from(this.selectedFiles), token).subscribe({
          next: (response) => {
            console.log("Car added successfully!");
            //this.resetForm();
          },
          error: (error) => {
            console.error("Error adding car: ", error);
          }
        });
      } else {
        console.error("No token found");
      }
    }
  }

  resetForm() {
    this.carForm.reset({
      brand: '',
      type: '',
      name: '',
      yearofmanufacture: 0,
      seats: 0,
      doors: 0,
      baggages: 0,
      transmission: '',
      priceperday: '',
      mileagekm: 0,
      engine: '',
      color: '',
      describecar: '',
      imagescar: [],
      moreoptions: []
    });
  }

  onMoreOptionsChange(event: any) {
    this.selectedOptions = Array.from(event.target.selectedOptions).map((option: any) => option.value);
  }


}
