package com.UrbanElite.Car_Rental_Spring.dto.Reservation;

import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.Reservation;
import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.ReservationStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GetReservationForCustomerResponse {
    private UUID id;
    private UUID carId;
    private UUID customerId;
    private UUID sellerId;
    private Long price;
    private Long totalprice;
    private String namecar;
    private String text;
    private LocalDate startDate;
    private LocalDate endDate;
    private ReservationStatus status;
    private String message;

    public GetReservationForCustomerResponse(Reservation reservation, String message){
        this.id = reservation.getId();
        this.carId = reservation.getCar().getId();
        this.customerId = reservation.getCustomer().getId();
        this.sellerId = reservation.getSeller().getId();
        this.price = reservation.getPrice();
        this.totalprice = reservation.getTotalprice();
        this.namecar = reservation.getNamecar();
        this.text = reservation.getText();
        this.startDate = reservation.getStartDate();
        this.endDate = reservation.getEndDate();
        this.status = reservation.getStatus();
        this.message = message;
    }
}
