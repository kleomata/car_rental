package com.UrbanElite.Car_Rental_Spring.dto.Customer;

import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GetCustomerResponse {
    private UUID id;
    private String nameCustomer;
    private String lastnameCustomer;
    private String username;
    private String emailCustomer;
    private String phoneCustomer;
    private String gender;
    private String imageCustomer;
    private LocalDate birthdate;
    private String location;

    private String token;

    public GetCustomerResponse(Customer customer, String image) {
        this.id = customer.getId();
        this.nameCustomer = customer.getNameCustomer();
        this.lastnameCustomer = customer.getLastnameCustomer();
        this.username = customer.getUsername();
        this.emailCustomer = customer.getEmailCustomer();
        this.phoneCustomer = customer.getPhoneCustomer();
        this.gender = customer.getGender();
        this.imageCustomer = image;
        this.birthdate = customer.getBirthdate();
        this.location = customer.getLocation();
        //this.token = token;
    }
}
