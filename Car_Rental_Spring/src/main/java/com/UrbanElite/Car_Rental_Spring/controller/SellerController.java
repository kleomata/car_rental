package com.UrbanElite.Car_Rental_Spring.controller;


import com.UrbanElite.Car_Rental_Spring.dto.Car.AddCarRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.GetSellerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.LoginSellerRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Car;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import com.UrbanElite.Car_Rental_Spring.service.CarService;
import com.UrbanElite.Car_Rental_Spring.service.CustomSellerDetails;
import com.UrbanElite.Car_Rental_Spring.service.SellerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/seller")
public class SellerController {
    @Autowired
    private SellerService sellerService;

    @Autowired
    private CarService carService;

    @PostMapping("/loginSeller")
    public ResponseEntity<GetSellerResponse> loginSeller(@RequestBody LoginSellerRequest request) {
        GetSellerResponse response = sellerService.loginSeller(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logoutSeller")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<String> logoutAdmin(HttpServletRequest request){
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            sellerService.logutSeller(jwt);
        }

        return ResponseEntity.ok("Logout successful.");
    }


    @GetMapping("/seller-home")
    public String getSellerHome() {
        return "Welcome to the Admin-Home";
    }


    @GetMapping("/idSeller")
    public ResponseEntity<GetSellerResponse> getSellerById(@AuthenticationPrincipal UserDetails userDetails){
        //GetSellerResponse response = sellerService.getSellerById(id);
        //return ResponseEntity.ok(response);
        try {
            Seller seller = sellerService.getSellerById(userDetails.getUsername());
            GetSellerResponse response = new GetSellerResponse(seller);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    ///////////////////////////////////////////
    private final String UPLOAD_DIR = "/home/kmata/Desktop/CarRentalProject/Images";

    @PostMapping("/addCar")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<GetCarResponse> addCar(
            @Validated
            @ModelAttribute AddCarRequest request,
            //@RequestParam("car") String carJson,
            @RequestParam("images") MultipartFile[] images,
            Authentication authentication){

        UUID sellerId = ((CustomSellerDetails) authentication.getPrincipal()).getSeller().getId();

        List<String> imagesPaths = carService.saveImages(images);

        GetCarResponse carResponse = carService.addCar(request, sellerId, imagesPaths);
        return ResponseEntity.status(HttpStatus.CREATED).body(carResponse);
    }

    @GetMapping("/allCars")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<GetCarResponse>> getAllCars(@AuthenticationPrincipal UserDetails userDetails/*@PathVariable UUID sellerId*/) {
        UUID sellerId = ((CustomSellerDetails) userDetails).getSeller().getId();

        List<GetCarResponse> cars = carService.getAllCar(sellerId);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(UPLOAD_DIR).resolve(imageName);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{carId}")
    public ResponseEntity<GetCarResponse> getCarById(@PathVariable UUID carId, Authentication authentication) {
        //UUID sellerId = ((CustomSellerDetails) authentication).getSeller().getId();
        CustomSellerDetails customSellerDetails = (CustomSellerDetails) authentication.getPrincipal();
        UUID sellerId = customSellerDetails.getSeller().getId();

        GetCarResponse response = carService.getCarById(carId, sellerId);
        return ResponseEntity.ok(response);

    }

}
