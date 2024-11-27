import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthenticationService, GetCarResponse } from '../AuthentiactionPackage/authentication.service';
import { NgIf, NgFor, NgClass, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-details-user',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ReactiveFormsModule],
  templateUrl: './car-details-user.component.html',
  styleUrl: './car-details-user.component.css'
})
export class CarDetailsUserComponent implements OnInit, AfterViewInit{
  carDetailsUser: GetCarResponse | null = null
  carIdUser!: string;

  bookingForm: FormGroup;
  totalPrice: number | null = null;
  totalDays: number | null = null;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.setCurrentDay();
    this.checkIfOpenNow();

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        window.scrollTo(0,0)
        this.carIdUser = this.route.snapshot.paramMap.get('carIdUser') || '';
        //this.getCarDetailsUser();
        this.ngOnInit()
        //this.ngAfterViewInit()
      }
    });
    this.bookingForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      text: ['', Validators.required],
      price:  [{ value: null, disabled: true }],
      namecar:  [{ value: null, disabled: true }],
      totalprice:  [{ value: 0, disabled: true }],
    });

  }

  filterCarsRandom: GetCarResponse[] = []
  carsGet: GetCarResponse[] = []



  ngOnInit(): void {
    this.carIdUser = this.route.snapshot.paramMap.get('carIdUser') || ''
    console.log('Car ID:', this.carIdUser); 
    this.getCarDetailsUser();
    this.loadCarUser();
  }


  loadCarUser(): void {
    this.authService.getAllCarsUser().subscribe(
      (data: GetCarResponse[]) => {
        this.carsGet = data;
        this.filterRandomCars();
      },
      (error) => {
        console.error("Error car", error)
      }
    ) 
  } 



  getCarDetailsUser(): void {
    this.authService.getCarByIdUser(this.carIdUser).subscribe(
      (data) => {
        this.carDetailsUser = data;
        this.setCarDetails();
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    )
  }
  setCarDetails() {
    if (this.carDetailsUser) {
      this.bookingForm.patchValue({
        price: this.carDetailsUser.priceperday,
        namecar: `${this.carDetailsUser.brand} ${this.carDetailsUser.name} ${this.carDetailsUser.yearofmanufacture}`
      });
    }
  }


  /* ======= Image Swiper ========== */
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const thumbsSwiperCarDetails = new Swiper('.thumbs-swiper-carDetailsUser',{
          slidesPerView: 5,
          spaceBetween: 10,
          loop: true,
          watchSlidesProgress: true,
          slideToClickedSlide: true
        })
       

        const swiper = new Swiper('.swiper-carDetailsUser', {
          loop: true,
          speed: 1000,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          autoplay: {
            delay: 1000,
            disableOnInteraction: false,
          },
          thumbs: {
            swiper: thumbsSwiperCarDetails
          },
        });
      }, 100); 
    }
  }


  days = [
    { day: 'Sunday', status: 'Open 24 hours' },
    { day: 'Monday', status: 'Open 24 hours' },
    { day: 'Tuesday', status: 'Open 24 hours' },
    { day: 'Wednesday', status: 'Open 24 hours' },
    { day: 'Thursday', status: 'Open 24 hours' },
    { day: 'Friday', status: 'Open 24 hours' },
    { day: 'Saturday', status: 'Open 24 hours' },
  ];

  currentDay: string = ''; 
  isOpenNow: boolean = false;
  currentStatusDay: string = '';

  setCurrentDay() {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    this.currentDay = new Intl.DateTimeFormat('en-US', options).format(new Date());
  }

  checkIfOpenNow() {
    const today = this.days.find(day => day.day === this.currentDay);
    if (today) {
      this.isOpenNow = today.status.includes('Open');
      this.currentStatusDay = today.status
    } else {
      this.isOpenNow = false;
      this.currentStatusDay = 'Clodes'
    }
  }

  getStatusText() {
    return this.isOpenNow ? "Open Now" : "Closed Now";
  }

  /* =================================== */ 
  // Random Car
  filterRandomCars(): void {
    const currentCarsId = this.carIdUser
    this.filterCarsRandom = this.getRandomCar(this.carsGet, currentCarsId, 6)
  }

  getRandomCar(cars: GetCarResponse[], currentCarId: string, count: number): any[] {
    const filterRandomCars = cars.filter(car => car.id != currentCarId)
    const shuffled = filterRandomCars.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  carBookNow(carIdUser: string): void {
    this.router.navigate(["/Urban-Elite/fleet", carIdUser]).then(() => {
      window.scrollTo(0,0)
      setTimeout(() => {
        window.location.reload();
      }, 100);
    })
  }


  /* ================================= */
  /*================ Book ==================== */

  calculateTotal() {
    if (!this.carDetailsUser) {
      this.totalPrice = null;
      this.totalDays = null; 
      return;
    }

    const pricePerDay = this.carDetailsUser.priceperday ?? 0;
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end > start) {
        this.totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        this.totalPrice = this.totalDays * pricePerDay;
      } else {
        this.totalDays = null;
        this.totalPrice = null;
      }
    } else {
      this.totalDays = null;
      this.totalPrice = null;
    }
  }




  bookNow() {
    if (this.bookingForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const bookingData = {
      startDate: this.bookingForm.get('startDate')?.value,
      endDate: this.bookingForm.get('endDate')?.value,
      text: this.bookingForm.get('text')?.value,
      price: this.carDetailsUser?.priceperday,
      namecar: this.bookingForm.get('namecar')?.value,
      totalprice: this.totalPrice,
      carId: this.carIdUser
    };
    console.log(bookingData)
    this.authService.sendReservation(bookingData).subscribe(
      response => {
        console.log('Reservation successful:', response);
        //this.bookingForm.reset();
        this.resetForm()
      },
      error => {
        console.error('Reservation failed:', error);
      }
    );
  }

  resetForm() {
    this.bookingForm.get('startDate')?.reset(),
    this.bookingForm.get('endDate')?.reset(),
    this.bookingForm.get('text')?.reset(),
    
    this.totalDays = 0;
    this.totalPrice = 0;
  }



}
