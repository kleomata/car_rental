package com.UrbanElite.Car_Rental_Spring.repository;

import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findBySellerId(UUID sellerId);
    List<Reservation> findByCustomerId(UUID customerId);
}
