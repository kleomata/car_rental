import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FleetComponent } from './fleet/fleet.component';
import { ServicesComponent } from './services/services.component';
import { CarBrandsComponent } from './car-brands/car-brands.component';
import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './Admin_Package/dashboard-admin/dashboard-admin.component';
import { CarRentalMainComponent } from './car-rental-main/car-rental-main.component';
import { LoginAdminComponent } from './Admin_Package/login-admin/login-admin.component';
import { CreateSellerComponent } from './Admin_Package/create-seller/create-seller.component';
import { EditSellerComponent } from './Admin_Package/edit-seller/edit-seller.component';
import { DeleteSellerComponent } from './Admin_Package/delete-seller/delete-seller.component';
import { AllSellerComponent } from './Admin_Package/all-seller/all-seller.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { authGuard } from './AuthentiactionPackage/auth.guard';
import { SpecificSellerComponent } from './Admin_Package/specific-seller/specific-seller.component';
import { LoginSellerComponent } from './Seller_Package/login-seller/login-seller.component';
import { SellerHomeComponent } from './Seller_Package/seller-home/seller-home.component';
import { DashboardSellerComponent } from './Seller_Package/dashboard-seller/dashboard-seller.component';
import { AddCarComponent } from './Seller_Package/add-car/add-car.component';
import { AllCarsComponent } from './Seller_Package/all-cars/all-cars.component';
import { CarDetailComponent } from './Seller_Package/car-detail/car-detail.component';
import { CarDetailsUserComponent } from './car-details-user/car-details-user.component';
import { ReservationSellerComponent } from './Seller_Package/reservation-seller/reservation-seller.component';
import { DashboardCustomerComponent } from './Customer_Package/dashboard-customer/dashboard-customer.component';
import { CustomerComponent } from './Customer_Package/customer/customer.component';
import { ReservationCustomerComponent } from './Customer_Package/reservation-customer/reservation-customer.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {path: '', redirectTo:'/Urban-Elite', pathMatch: "full"},
    {path: 'Urban-Elite', component: CarRentalMainComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'about-us', component: AboutComponent},
            {path: 'services', component: ServicesComponent},
            {path: 'brands', component: CarBrandsComponent},
            {path: 'fleet', component: FleetComponent},
            {path: 'fleet/:carIdUser', component: CarDetailsUserComponent},
            {path: 'contact-us', component: ContactComponent},
            {path: 'customer', component: CustomerComponent, canActivate: [authGuard],
                children: [
                    {path: '', redirectTo: 'dashboard-customer', pathMatch: 'full'},
                    {path: 'dashboard-customer', component: DashboardCustomerComponent},
                    {path: 'reservation-customer', component: ReservationCustomerComponent}
                ]
            }
        ]
    },


    {path: 'admin', component: LoginAdminComponent},
    {path: 'admin-home', component: AdminHomeComponent, canActivate: [authGuard],
    children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardAdminComponent},
            {path: 'create-seller', component: CreateSellerComponent},
            {path: 'edit-seller', component: EditSellerComponent},
            {path: 'delete-seller', component: DeleteSellerComponent},
            {path: 'all-seller', component: AllSellerComponent},
            {path: 'specifice-seller', component: SpecificSellerComponent}
        ]
    },

    {path: 'seller', component: LoginSellerComponent},
    {path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardSellerComponent},
            {path: 'add-car', component: AddCarComponent},
            {path: 'all-cars', component: AllCarsComponent},
            {path: 'reservation-seller', component: ReservationSellerComponent},
            {path: ':carId', component: CarDetailComponent}
        ]
    },
    {path: 'Not-Found-404', component: ErrorComponent},
    {path: '**', redirectTo: '/Not-Found-404'}

];  