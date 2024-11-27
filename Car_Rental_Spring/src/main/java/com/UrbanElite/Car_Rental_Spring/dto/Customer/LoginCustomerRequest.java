package com.UrbanElite.Car_Rental_Spring.dto.Customer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginCustomerRequest {
    private String username;
    private String passwordCustomer;
}
