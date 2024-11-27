package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.dto.GetAdminResponse;
import com.UrbanElite.Car_Rental_Spring.dto.LoginAdminRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Admin;

public interface AdminService {
    GetAdminResponse login(LoginAdminRequest request);
    void createAdmin(Admin admin);
    String generateToken(String usename);
    GetAdminResponse getAdmin(String username);

    void logutAdmin(String token);
}

