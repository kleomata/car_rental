import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router'
import { UUID } from 'crypto';

export interface GetAdminResponse {
  id: string;
  username: string;
  name: string;
  lastname: string;
}

export interface CreateSellerRequest {
  nameSeller: string;
  lastnameSeller: string;
  emailSeller: string;
  telSeller: string;
  locationSeller: string;
  username: string;
  passwordSeller: string;
}

export interface GetSellerResponse {
  id: UUID;
  nameSeller: string;
  lastnameSeller: string;
  emailSeller: string;
  telSeller: string;
  locationSeller: string;
  username: string;
  admin: any; 
}

export interface AddCarRequest {
  //id: string; 
  brand: string;
  type: string;
  name: string;
  yearofmanufacture: number;
  seats: number;
  doors: number;
  baggages: number;
  transmission: string;
  priceperday: string;
  mileagekm: number;
  engine: string;
  color: string;
  describecar: string;
  //imagescar?: File[]; 
  moreoptions: string[]; 
}

export interface GetCarResponse {
  id: string;
  brand: string;
  type: string;
  name: string;
  yearofmanufacture: number;
  seats: number;
  doors: number;
  baggages: number;
  transmission: string;
  priceperday: number;
  mileagekm: number;
  engine: string;
  color: string;
  describecar: string;
  imagescar: string[];
  moreoptions: string[];
  sellerid: string;
}

export interface GetCustomerResponse {
  id: string;
  nameCustomer: string;
  lastnameCustomer: string;
  username: string;
  emailCustomer: string;
  phoneCustomer: string;
  gender: string;
  imageCustomer: string; 
  birthdate: string; 
  location: string;
}

export interface GetReservationResponse {
  id: string;
  carId: string;
  totalprice: number;
  namecar: string;
  text: string;
  status: string;
  startDate: string;
  endDate: string;
  price: number;
}

export interface GetReservationForCustomerResponse {
  id: string;
  carId: string;
  totalprice: number;
  namecar: string;
  text: string;
  status: string;
  startDate: string;
  endDate: string;
  price: number;
  message: string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  // Api URL ADMIN
  private apiUrl = 'http://localhost:8080/api/admin';  
  // Api URL SELLER
  private apiUrlSeller = 'http://localhost:8080/api/seller'

  // Api URL USER
  private apiUrlUser = 'http://localhost:8080/api/user'

  // Api URL CUSTOMER
  private apiUrlCustomer = 'http://localhost:8080/api/customer'

  // Api URL CUSTOMER
  private apiUrlReservation = 'http://localhost:8080/api/reservation'
  /////////////////////////////////////////////////
  /* Authentication for ADMIN */

  // TOKEN 
  private tokenKey = 'token';
  
  constructor(private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {username, password})
    .pipe(
      tap (response => {
        if (response.token){
          localStorage.setItem('token', response.token),
          console.log('Token i ruajtur:', response.token); 
        }
      }),      
      catchError((error: HttpErrorResponse) => {
        console.error('Login error: ', error);
        return throwError(error);
      }) 
    )
  }

  getAdmin(): Observable<GetAdminResponse> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GetAdminResponse>(`${this.apiUrl}/getAdmin`, {headers})
  }
  
  logout(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/logoutAdmin`, {}, { headers, responseType: 'text' }).pipe(
      tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/admin'])
          //window.location.reload()
      }),
      catchError(error => {
          console.error("Error during logout", error);
          return throwError(error);
      })
    );
  }


  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): String | null {
    return localStorage.getItem(this.tokenKey);
  }


  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }



  // Seller Create 
  createSeller(request: CreateSellerRequest, token: String): Observable<GetSellerResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<GetSellerResponse>(`${this.apiUrl}/createSeller`, request, {headers})
  }


  getAllSellers(): Observable<GetSellerResponse[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GetSellerResponse[]>(`${this.apiUrl}/allSellers`, {headers}); // Shto endpoint-in e duhur
  }

  editSeller(id: string, sellerData: GetSellerResponse): Observable<GetSellerResponse> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<GetSellerResponse>(`${this.apiUrl}/editSeller/${id}`, sellerData, {headers}); // Shto endpoint-in e duhur
  }

  deleteSeller(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.delete<void>(`${this.apiUrl}/deleteSeller/${id}`, {headers})
  }



  /* Authentication for SELLER */
  loginSeller(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlSeller}/loginSeller`, {username, password})
    .pipe(
      tap (response => {
        if (response.token) {
          localStorage.setItem('token', response.token),
          console.log('Token i ruajtur:', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error: ', error);
        if (error.status === 401) {
          console.error('Kredencialet janë të gabuara.');
        }
        return throwError(error);
      })
    );
  }

  
  logoutSeller(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrlSeller}/logoutSeller`, {}, { headers, responseType: 'text' }).pipe(
      tap(() => {
          localStorage.removeItem('token');
          //window.location.reload()
          this.router.navigate(['/seller'])
      }),
      catchError(error => {
          console.error("Error during logout", error);
          return throwError(error);
      })
    );
  }

  getSellerById(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlSeller}/idSeller`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching seller profile:', error);
        return throwError(error);
      })
    );
  }

  /* Add Car */
  addCar(request: AddCarRequest, images: File[], token: String): Observable<any> {
    const formData = new FormData();

    for (const key in request) {
      if (request.hasOwnProperty(key)) {
        const value = request[key as keyof AddCarRequest];
  
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else {
          formData.append(key, String(value));
        }
      }
    }
 
    images.forEach(image => {
      formData.append('images', image, image.name);
    })

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<any>(`${this.apiUrlSeller}/addCar`, formData, {headers})
  }

  getAllCars(): Observable<GetCarResponse[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GetCarResponse[]>(`${this.apiUrlSeller}/allCars`, {headers}); 
  }

  getCarById(carId: string): Observable<GetCarResponse> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<GetCarResponse>(`${this.apiUrlSeller}/${carId}`, {headers}); 
  }

 // getImage(imageName: string): Observable<Blob> {
   // return this.http.get(`${this.apiUrlSeller}/images/${imageName}`, { responseType: 'blob' });
  //}


  //////////////////////////////////////////
  // Cars for User 
  getAllCarsUser(): Observable<GetCarResponse[]> {
    return this.http.get<GetCarResponse[]>(`${this.apiUrlUser}/allCarsUser`);
  }

  getCarByIdUser(carIdUser: string): Observable<GetCarResponse>{
    return this.http.get<GetCarResponse>(`${this.apiUrlUser}/${carIdUser}`)
  }


  ////////////////////////////////////
  // CUSTOMER
  //Registet Customer
  registerCustomer(request: any, imageCustomer: File): Observable<any> {
    //return this.http.post<any>(`${this.apiUrlCustomer}/registerCustomer`, request)
    const formData = new FormData()

    for (const key in request) {
      if (request.hasOwnProperty(key)) {
        const value = request[key as keyof any];
  
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else {
          formData.append(key, String(value));
        }
      }
    }

    if (imageCustomer) {
      formData.append('imageCustomer', imageCustomer, imageCustomer.name);
    }

    return this.http.post<any>(`${this.apiUrlCustomer}/registerCustomer`, formData)
        .pipe(
            tap((response) => {
                console.log('Regjistrimi u realizua me sukses!', response);
            }),
            catchError((error) => {
                console.error('Gabim gjatë regjistrimit', error);
                return throwError('Regjistrimi ka dështuar. Provoni përsëri.');
            })
        );
  }

  //Login Customer
  loginCustomer(username: string, passwordCustomer: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlCustomer}/loginCustomer`, {username, passwordCustomer})
    .pipe(
      tap(response => {
        if(response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token i ruajtur:', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error: ',error);
        if(error.status === 401) {
          console.error("Kredencialet jane gabim")
        }
        return throwError(error);
      })
    )
  }

  logoutCustomer(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrlCustomer}/logoutCustomer`, {}, { headers, responseType: 'text' }).pipe(
      tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/Urban-Elite/home'])
          window.location.reload()
      }),
      catchError(error => {
          console.error("Error during logout", error);
          return throwError(error);
      })
    );
  }

  //Get Customer Info
  getCustomerByUsername(): Observable<GetCustomerResponse> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<GetCustomerResponse>(`${this.apiUrlCustomer}/idCustomer`, {headers})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching Customer profile:', error);
        return throwError(error);
      })
    );
  }
  
  getImage(imageName: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:8080${imageName}`, { headers, responseType: 'blob' });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }



  /* ==================================== */
  /* Reservation */
  sendReservation(bookingData: any): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrlReservation}/sendReservation`, bookingData, {headers})
  }

  /* Reservation For Seller */
  getReservationForSeller(): Observable<GetReservationResponse[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      return of([]); 
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    
    return this.http.get<GetReservationResponse[]>(`${this.apiUrlReservation}/reservationForSeller`, { headers })
      .pipe(
        catchError(err => {
          console.error('Error fetching reservations:', err);
          return of([]); 
        })
      );
  }

  getReservationForCustomer(): Observable<GetReservationForCustomerResponse[]> {
    const token = localStorage.getItem('token');
    if(!token) {
      console.error('Token in missing');
      return of([])
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    })

    return this.http.get<GetReservationForCustomerResponse[]>(`${this.apiUrlReservation}/reservationForCustomer`, {headers})
    .pipe(
      catchError(err => {
        console.error('Error fetching reservations:', err);
        return of([]); 
      })
    )
  }


  acceptReservation(reservationId: string, message: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    })
    return this.http.post<void>(`${this.apiUrlReservation}/acceptReservation/${reservationId}`, message, {headers})
  }


  rejectReservation(reservationId: string, message: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<void>(`${this.apiUrlReservation}/rejectReservation/${reservationId}`, message, {headers})
  }
    


}

