import { Component } from '@angular/core';
import { AddCarRequest, AuthenticationService, GetCarResponse } from '../../AuthentiactionPackage/authentication.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-cars',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './all-cars.component.html',
  styleUrl: './all-cars.component.css'
})
export class AllCarsComponent {
  currentCar: GetCarResponse | null =  null

  carsGet: GetCarResponse[] = [];
    constructor(private authService: AuthenticationService,
      private router: Router
    ){}


  ngOnInit(): void {
    this.loadCar();
  }

  loadCar(): void {
    this.authService.getAllCars().subscribe(
      (data: GetCarResponse[]) => {
        this.carsGet = data;
      // this.loadImages()
      },
      (error) => {
        console.error("Erro car", error)
      }
    )
  }

  viewCarDetails(carId: string): void {
    this.router.navigate(['/seller-home', carId]);
  }

}
