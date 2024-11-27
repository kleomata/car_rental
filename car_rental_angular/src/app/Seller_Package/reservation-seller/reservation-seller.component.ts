import { Component, OnInit } from '@angular/core';
import { AuthenticationService, GetReservationResponse } from '../../AuthentiactionPackage/authentication.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-seller',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './reservation-seller.component.html',
  styleUrl: './reservation-seller.component.css'
})
export class ReservationSellerComponent implements OnInit{

  reservations: GetReservationResponse[] = []

  constructor(private authService: AuthenticationService) {}


  ngOnInit(): void {
      this.loadReservationForSeller();
  }

  loadReservationForSeller(): void {
    this.authService.getReservationForSeller().subscribe(
      (data: GetReservationResponse[]) => {
        this.reservations = data.reverse()
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

 
  acceptMessage: { [key: string]: string } = {};
  rejectMessage: { [key: string]: string } = {};
  isAcceptModalOpen = false;
  isRejectModalOpen = false;
  currentReservationId: string | null = null ;


  openAcceptModal(reservationId: string) {
    this.currentReservationId = reservationId;
    this.isAcceptModalOpen = true;
    this.isRejectModalOpen = false; 
    this.acceptMessage[reservationId] = ''; 
  }

  openRejectModal(reservationId: string) {
    this.currentReservationId = reservationId;
    this.isRejectModalOpen = true;
    this.isAcceptModalOpen = false; 
    this.rejectMessage[reservationId] = ''; 
  }

  onAccept() {
    if(this.currentReservationId) {
      this.authService.acceptReservation(this.currentReservationId, this.acceptMessage[this.currentReservationId])
      .subscribe(() => {
        this.closeModal();
        this.loadReservationForSeller(); 
      }, (error) => {
        console.error("Error accepting reservation", error);
      });
    }
    
  }

  onReject() {
    if(this.currentReservationId) {
      this.authService.rejectReservation(this.currentReservationId, this.rejectMessage[this.currentReservationId])
      .subscribe(() => {
        this.closeModal();
        this.loadReservationForSeller(); 
      }, (error) => {
        console.error("Error rejecting reservation", error);
      });
    }
  }

  closeModal() {
    this.isAcceptModalOpen = false;
    this.isRejectModalOpen = false;
    this.currentReservationId = null;
  }
  

}
