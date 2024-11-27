import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { AuthenticationService, GetReservationForCustomerResponse } from '../../AuthentiactionPackage/authentication.service';

@Component({
  selector: 'app-reservation-customer',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './reservation-customer.component.html',
  styleUrl: './reservation-customer.component.css'
})
export class ReservationCustomerComponent implements OnInit{

  reservationCustomer: GetReservationForCustomerResponse[] = []

  constructor(private authService: AuthenticationService) {}


  ngOnInit(): void {
    this.loadReservationForCustomer()  
  }


  loadReservationForCustomer(): void {
    this.authService.getReservationForCustomer().subscribe(
      (data: GetReservationForCustomerResponse[]) => {
        this.reservationCustomer = data.reverse()  
      },
      (error) => {
        console.error("Erro reservations for seller", error)
      }
    )
  }

  calculateDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // 1000ms * 3600s * 24h
    return differenceInDays;
  }




}
