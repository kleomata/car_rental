package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.dto.Reservation.GetReservationForCustomerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Reservation.GetReservationResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Reservation.SendReservationRequest;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.UUID;

public interface ReservationService {
    GetReservationResponse sendReservation(SendReservationRequest request, Authentication authentication);
    List<GetReservationForCustomerResponse> getReservationForCustomer(UUID customerId);

    List<GetReservationResponse> getReservationForSeller(UUID sellerId);


    void acceptReservation(UUID reservationId, String message, UUID sellerId);
    void rejectReservation(UUID reservationId, String message, UUID sellerId);

}

