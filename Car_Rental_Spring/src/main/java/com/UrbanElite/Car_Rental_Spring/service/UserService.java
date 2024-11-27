package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<GetCarResponse> getAllCars();
    GetCarResponse getCarByIdUser(UUID carId);
}
