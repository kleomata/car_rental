package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.dto.Seller.CreateSellerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.EditSellerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.GetSellerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.LoginSellerRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;

import java.util.List;
import java.util.UUID;

public interface SellerService {
    GetSellerResponse createSeller(CreateSellerRequest request, UUID adminId);
    GetSellerResponse editSeller(EditSellerRequest request, UUID id, UUID adminId);
    List<GetSellerResponse> getAllSeller();
    void deleteSeller(UUID id);

    GetSellerResponse loginSeller(LoginSellerRequest request);
    String generateToken(String usename);
    Seller getSellerById(String username);

    void logutSeller(String token);

}
