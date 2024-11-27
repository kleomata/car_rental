package com.UrbanElite.Car_Rental_Spring.repository;

import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SellerRepository extends JpaRepository<Seller, UUID> {
    Optional<Seller> findByUsername(String username);
}
