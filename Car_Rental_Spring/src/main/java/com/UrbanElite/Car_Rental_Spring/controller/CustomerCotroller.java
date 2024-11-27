package com.UrbanElite.Car_Rental_Spring.controller;

import com.UrbanElite.Car_Rental_Spring.dto.Customer.GetCustomerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.LoginCustomerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.RegisterCustomerRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import com.UrbanElite.Car_Rental_Spring.service.CustomCustomerDetails;
import com.UrbanElite.Car_Rental_Spring.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/customer")
public class CustomerCotroller {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/registerCustomer")
    //@PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<GetCustomerResponse> registerCustomer(@Validated @ModelAttribute RegisterCustomerRequest registerCustomerRequest, @RequestParam("imageCustomer")MultipartFile image/*,Authentication authentication*/) {
        //try {
        String imagePath = customerService.saveProfileImage(image);
        GetCustomerResponse response = customerService.registerCustomer(registerCustomerRequest, imagePath);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
        //} catch (Exception e) {
            //e.printStackTrace();
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        //}
    }

    @PostMapping("/loginCustomer")
    public ResponseEntity<GetCustomerResponse> loginCustomer(@RequestBody LoginCustomerRequest request) {
        GetCustomerResponse response = customerService.loginCustomer(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logoutCustomer")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<String> logoutCustomer(HttpServletRequest request){
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            customerService.logutCustomer(jwt);
        }

        return ResponseEntity.ok("Logout successful.");
    }

    private final String UPLOAD_DIR = "/home/kmata/Desktop/CarRentalProject/Profile";

    @GetMapping("/idCustomer")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<GetCustomerResponse> getCustomerById(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            CustomCustomerDetails customCustomerDetails = (CustomCustomerDetails) userDetails;
            String username = customCustomerDetails.getUsername();

            if (username == null || username.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            GetCustomerResponse response = customerService.getCustomerByUsername(username);

            if (response == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching customer profile: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }


    @GetMapping("/imageCustomer/{imageName}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Resource> getImageCustomer(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(UPLOAD_DIR).resolve(imageName).normalize();
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error fetching image: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }


}
