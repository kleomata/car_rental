import { Component, OnInit } from '@angular/core';
import { AuthenticationService, GetAdminResponse } from '../../AuthentiactionPackage/authentication.service';
import { NgIf } from '@angular/common';
import { error } from 'console';


@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{
 
  constructor(private authService: AuthenticationService) {}

  getAdmin: GetAdminResponse | null = null;

  ngOnInit(): void {
    this.loadAdmin()
  }

  loadAdmin(): void {
    this.authService.getAdmin().subscribe(
      (data: GetAdminResponse) =>{
        this.getAdmin = data
      },
      (error) => {
        console.error("Not Found Admin ", error)
      }
    )
  }

}
