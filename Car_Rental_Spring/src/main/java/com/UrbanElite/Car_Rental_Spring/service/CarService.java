package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.dto.Car.AddCarRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;
import com.UrbanElite.Car_Rental_Spring.entity.Car;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface CarService {
    //GetCarResponse addCar(GetCarResponse response, UUID sellerId);
    GetCarResponse addCar(AddCarRequest request, UUID sellerId, List<String> imagePaths);
    List<GetCarResponse> getAllCar(UUID id);
    //    List<GetCarResponse> getAllCar();
    List<String> saveImages(MultipartFile[] images);

    GetCarResponse getCarById(UUID carId, UUID sellerId);
}
