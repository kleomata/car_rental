package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.dto.Customer.GetCustomerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.LoginCustomerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.RegisterCustomerRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface CustomerService {
    GetCustomerResponse registerCustomer(RegisterCustomerRequest request, String image);
    GetCustomerResponse loginCustomer(LoginCustomerRequest request);
    String saveProfileImage(MultipartFile image);

    String generateToken(String usename);

    GetCustomerResponse getCustomerByUsername(String username);

    void logutCustomer(String token);

}
