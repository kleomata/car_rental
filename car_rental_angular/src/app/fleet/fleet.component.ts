import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AuthenticationService, GetCarResponse } from '../AuthentiactionPackage/authentication.service';
import { FormsModule } from '@angular/forms';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css'
})
export class FleetComponent implements OnInit, AfterViewInit{
  minPrice: number = 0;
  maxPrice: number = 0;
  maxPriceLimit: number = 0; 
  minPriceLimit: number = 0; 
  carsGet: GetCarResponse[] = []
  filteredCars: GetCarResponse[] = [];
  filterCarCounter: number = 0;
  
  carTypeFilter: string = ''; 
  selectedCarType: string = '';


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthenticationService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadCarUser();
  }

  ngAfterViewInit(): void {

  }


  initializeSlider() {
    if(isPlatformBrowser(this.platformId)) {
      const slider = document.getElementById('priceRangeFleet') as any;

      noUiSlider.create(slider, {
        start: [this.minPrice, this.maxPriceLimit],
        connect: true,
        range: {
          'min': this.minPriceLimit,
          'max': this.maxPriceLimit,
        },
        step: 1,
      });

      slider.noUiSlider.on('update', (values: string[]) => {
        this.minPrice = Math.round(+values[0]);
        this.maxPrice = Math.round(+values[1]);
        this.applyFilter();
      });
    }
  }

  loadCarUser(): void {
    this.authService.getAllCarsUser().subscribe(
      (data: GetCarResponse[]) => {
        this.carsGet = data;
        this.filteredCars = this.carsGet; 
        this.setMaxPrice(); 
        this.maxPrice = this.maxPriceLimit;
        this.setMinPrice()
        this.minPrice = this.minPriceLimit;

        this.initializeSlider();
      },
      (error) => {
        console.error("Error car", error)
      }
    ) 
  } 

  setMinPrice() {
    if(this.carsGet.length > 0 ){
      this.minPriceLimit = Math.min(...this.carsGet.map(car => car.priceperday));
      this.minPrice = this.minPriceLimit
    }
  }

  setMaxPrice() {
    if (this.carsGet.length > 0) {
      this.maxPriceLimit = Math.max(...this.carsGet.map(car => car.priceperday));
      this.maxPrice = this.maxPriceLimit; 
    }
  }

  applyFilter() {
    this.filteredCars = this.carsGet.filter(car => 
      car.priceperday >= this.minPrice && car.priceperday <= this.maxPrice &&
      car.brand.toLowerCase().includes(this.carTypeFilter.toLowerCase()) &&
      (this.selectedCarType === '' || car.type === this.selectedCarType) 
    );
    this.filterCarCounter = this.filteredCars.length
    this.sortItems();  
    this.selectedCarType = ''
  }

  filterByCarType(carType: string) {
    this.selectedCarType = carType; 
    this.applyFilter();
  }



  sortType: string = ''

  sortAscending() {
    this.sortType = 'asc'
    this.sortItems();  
  }


  sortDescending() {
    this.sortType = 'desc';
    this.sortItems();  
  }

  sortA_Z() {
    this.sortType = 'a_z';
    this.sortItems();  
  }

  sortZ_A() {
    this.sortType = 'z_a';
    this.sortItems();  
  }

   
  sortItems() {
    switch (this.sortType) {
      case 'asc':
        this.filteredCars.sort((a, b) => a.priceperday - b.priceperday);
        break;
      case 'desc':
        this.filteredCars.sort((a, b) => b.priceperday - a.priceperday);
        break;
      case 'a_z':
        this.filteredCars.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'z_a':
        this.filteredCars.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
    }
  }

  clearSort() {
    this.sortType = '';
    this.filteredCars = this.carsGet.filter(car => 
      car.priceperday >= this.minPrice && car.priceperday <= this.maxPrice
    ); 
    this.filterCarCounter = this.filteredCars.length; 
  }



  carBookNow(carIdUser: string): void {
    this.router.navigate(["/Urban-Elite/fleet", carIdUser])
  }

}

