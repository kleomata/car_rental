package com.UrbanElite.Car_Rental_Spring.repository;

import com.UrbanElite.Car_Rental_Spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CarRespository extends JpaRepository<Car, UUID> {
    Optional<Car> findById(UUID id);
    List<Car> findBySellerId(UUID id);
    Car findByIdAndSellerId(UUID id, UUID sellerId);
}
