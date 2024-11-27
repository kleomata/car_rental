import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, GetSellerResponse } from '../../AuthentiactionPackage/authentication.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-seller',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './delete-seller.component.html',
  styleUrl: './delete-seller.component.css'
})
export class DeleteSellerComponent implements OnInit{

  showConfirmDialog = false;
  selectedSellerId: string | null = null;
  confirmationMessage: string = ''
  idMessage: string = ''

  sellers: GetSellerResponse[] = [];
  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    this.loadSeller();
  }


  loadSeller(): void {
    this.authService.getAllSellers().subscribe(
      (data: GetSellerResponse[]) => {
        this.sellers = data;
      },
      (error) => {
        console.error("Erro sellers", error)
      }
    )
  }

  openCOnfirmDialog(id: string): void{
    this.selectedSellerId = id;
    this.showConfirmDialog = true;
    this.confirmationMessage =  'Are you sure you want to delete this seller with'
    this.idMessage = `ID: ${id}`
  }

  handleDialogResponse(confirmed: boolean): void {
    this.showConfirmDialog = false;
    if (confirmed && this.selectedSellerId) {
      this.authService.deleteSeller(this.selectedSellerId).subscribe(
        () => {
          console.log("Seller deleted successfully");
          this.loadSeller();
        },
        (error) => {
          console.error("Error deleting seller", error);
        }
      );
    }
  }
}
