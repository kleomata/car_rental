package com.UrbanElite.Car_Rental_Spring.controller;

import com.UrbanElite.Car_Rental_Spring.dto.Reservation.GetReservationForCustomerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Reservation.GetReservationResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Reservation.SendReservationRequest;
import com.UrbanElite.Car_Rental_Spring.service.CustomCustomerDetails;
import com.UrbanElite.Car_Rental_Spring.service.CustomSellerDetails;
import com.UrbanElite.Car_Rental_Spring.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;


    @PostMapping("/sendReservation")
    public ResponseEntity<GetReservationResponse> sendReservation(@Validated @RequestBody SendReservationRequest request, Authentication authentication) {
        //UUID customerId = ((CustomCustomerDetails) authentication.getPrincipal()).customer().getId();
        GetReservationResponse response = reservationService.sendReservation(request, authentication);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/reservationForSeller")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<List<GetReservationResponse>> getReservationForSeller(@AuthenticationPrincipal UserDetails userDetails) {
        UUID sellerId = ((CustomSellerDetails) userDetails).getSeller().getId();

        List<GetReservationResponse> reservations = reservationService.getReservationForSeller(sellerId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/reservationForCustomer")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<GetReservationForCustomerResponse>> getReservationForCustomer(@AuthenticationPrincipal UserDetails userDetails) {
        UUID customerId = ((CustomCustomerDetails) userDetails).customer().getId();

        List<GetReservationForCustomerResponse> reservation = reservationService.getReservationForCustomer(customerId);
        return ResponseEntity.ok(reservation);
    }

    @PostMapping("/acceptReservation/{reservationId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Void> acceptReservation(@PathVariable UUID reservationId, @RequestBody String message, @AuthenticationPrincipal UserDetails userDetails) {
        UUID sellerId = ((CustomSellerDetails) userDetails).getSeller().getId();

        reservationService.acceptReservation(reservationId, message, sellerId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/rejectReservation/{reservationId}")
    @PreAuthorize("hasRole('SELLER')")
    public ResponseEntity<Void> rejectReservation(@PathVariable UUID reservationId, @RequestBody String message, @AuthenticationPrincipal UserDetails userDetails) {
        UUID sellerId = ((CustomSellerDetails) userDetails).getSeller().getId();

        reservationService.rejectReservation(reservationId, message, sellerId);
        return ResponseEntity.ok().build();
    }


}
