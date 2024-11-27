package com.UrbanElite.Car_Rental_Spring.repository;

import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.ReservationMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReservationMessageRepository extends JpaRepository<ReservationMessage, UUID> {
    ReservationMessage findByReservationId(UUID reservationId);
}
