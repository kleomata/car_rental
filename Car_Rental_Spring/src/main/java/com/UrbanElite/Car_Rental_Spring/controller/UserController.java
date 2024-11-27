package com.UrbanElite.Car_Rental_Spring.controller;

import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;
import com.UrbanElite.Car_Rental_Spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/allCarsUser")
    public ResponseEntity<List<GetCarResponse>> getAllCarsUser() {
        List<GetCarResponse> cars = userService.getAllCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{carIdUser}")
    public ResponseEntity<GetCarResponse> getCarByIdUser(@PathVariable UUID carIdUser) {
        GetCarResponse response = userService.getCarByIdUser(carIdUser);
        return ResponseEntity.ok(response);
    }



}
