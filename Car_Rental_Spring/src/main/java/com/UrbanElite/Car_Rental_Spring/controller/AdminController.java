package com.UrbanElite.Car_Rental_Spring.controller;

import com.UrbanElite.Car_Rental_Spring.dto.GetAdminResponse;
import com.UrbanElite.Car_Rental_Spring.dto.LoginAdminRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.CreateSellerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.EditSellerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.GetSellerResponse;
import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.service.AdminService;
import com.UrbanElite.Car_Rental_Spring.service.CustomUserDetails;
import com.UrbanElite.Car_Rental_Spring.service.SellerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private SellerService sellerService;

    @PostMapping("/login")
    public ResponseEntity<GetAdminResponse> login(@RequestBody LoginAdminRequest request) {
        GetAdminResponse response = adminService.login(request);
        return ResponseEntity.ok(response);
        //return adminService.login(request);
    }

    @PostMapping("/logoutAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> logoutAdmin(HttpServletRequest request){
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            adminService.logutAdmin(jwt);
        }

        return ResponseEntity.ok("Logout successful.");
    }

    @GetMapping("/getAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetAdminResponse> getAdmin(@AuthenticationPrincipal UserDetails userDetails) {
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
        String username = customUserDetails.getUsername();

        GetAdminResponse response = adminService.getAdmin(username);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> createAdmin(@RequestBody Admin admin) {
        adminService.createAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin create successfully");
    }

    @GetMapping("/admin-home")
    public String getAdminHome() {
        return "Welcome to the Admin-Home";
    }

    // CREATE SELLER
    @PostMapping("/createSeller")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetSellerResponse> createSeller(@Validated @RequestBody CreateSellerRequest createSellerRequest, Authentication authentication){
        //Admin admin = ((CustomUserDetails) authentication.getPrincipal()).getp
        UUID adminId = ((CustomUserDetails) authentication.getPrincipal()).getAdmin().getId();

        GetSellerResponse response = sellerService.createSeller(createSellerRequest, adminId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/editSeller/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetSellerResponse> editSeller(@PathVariable UUID id, @Validated @RequestBody EditSellerRequest editSellerRequest, Authentication authentication) {
        //UUID adminId = ((Admin) authentication.getPrincipal()).getId();
        UUID adminId = ((CustomUserDetails) authentication.getPrincipal()).getAdmin().getId();

        GetSellerResponse response = sellerService.editSeller(editSellerRequest, id, adminId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/allSellers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GetSellerResponse>> getAllSellers() {
        List<GetSellerResponse> sellers = sellerService.getAllSeller();
        return ResponseEntity.ok(sellers);
    }

    @DeleteMapping("/deleteSeller/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSeller(@PathVariable UUID id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
