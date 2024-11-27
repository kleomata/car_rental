package com.UrbanElite.Car_Rental_Spring.dto.Customer;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
public class RegisterCustomerRequest {
    private String nameCustomer;
    private String lastnameCustomer;
    private String username;
    private String passwordCustomer;
    private String emailCustomer;
    private String phoneCustomer;
    private String gender;
    //private String imageCustomer;
    private LocalDate birthdate;
    private String location;

}
