package com.UrbanElite.Car_Rental_Spring.dto.Reservation;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
public class SendReservationRequest {
    private UUID carId;
    private UUID customerId;
    private UUID sellerId;
    private Long price;
    private Long totalprice;
    private String namecar;
    private String text;
    private LocalDate startDate;
    private LocalDate endDate;
}
