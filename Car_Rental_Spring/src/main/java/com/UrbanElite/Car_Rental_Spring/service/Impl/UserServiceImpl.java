package com.UrbanElite.Car_Rental_Spring.service.Impl;

import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;
import com.UrbanElite.Car_Rental_Spring.entity.Car;
import com.UrbanElite.Car_Rental_Spring.repository.CarRespository;
import com.UrbanElite.Car_Rental_Spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    // All Car in User
    @Autowired
    private CarRespository carRespository;

    @Override
    public List<GetCarResponse> getAllCars() {
        List<Car> cars = carRespository.findAll();

        return cars.stream()
                .map(car -> {
                    List<String> images = car.getImagescar()
                            .stream()
                            .map(image -> "/api/seller/images/" + Paths.get(image).getFileName().toString())
                            .collect(Collectors.toList());
                    return new GetCarResponse(car, images);
                })
                .collect(Collectors.toList());
    }


    @Override
    public GetCarResponse getCarByIdUser(UUID id) {
        Car car = carRespository.findById(id).orElse(new Car());

        if (car.getId() == null) {
            return new GetCarResponse(new Car(), Collections.emptyList());
        }

        List<String> images = car.getImagescar()
                .stream()
                .map(image -> "/api/seller/images/" + Paths.get(image).getFileName().toString())
                .collect(Collectors.toList());

        return new GetCarResponse(car, images);
    }
}
