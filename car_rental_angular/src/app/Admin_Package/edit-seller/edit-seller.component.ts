import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, GetSellerResponse } from '../../AuthentiactionPackage/authentication.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-seller',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, NgIf, NgFor],
  templateUrl: './edit-seller.component.html',
  styleUrl: './edit-seller.component.css'
})
export class EditSellerComponent implements OnInit{
  sellers: GetSellerResponse[] = [];
  isEditing: boolean = false;
  editForm: FormGroup;
  currentSeller: GetSellerResponse | null = null;

  constructor(private authService: AuthenticationService, private fb: FormBuilder){
    this.editForm = this.fb.group({
      nameSeller: [''],
      lastnameSeller: [''],
      emailSeller: [''],
      telSeller: [''],
      locationSeller: [''],
      username: ['']
    });
  }

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

  openEdit(seller: GetSellerResponse): void{
    this.currentSeller = seller;
    this.editForm.patchValue(seller);
    this.isEditing = true
  }

  btnEditing() {
    this.isEditing = false;
  }

  saveEditSeller() {
    const editSeller = { ...this.currentSeller, ...this.editForm.value};
    this.authService.editSeller(editSeller.id, editSeller).subscribe(
      () => {
        this.loadSeller();
        this.isEditing = true
        this.currentSeller = null
      },
      (error) => {
        console.error("Error updating seller", error);
      }
    )
  }

}
