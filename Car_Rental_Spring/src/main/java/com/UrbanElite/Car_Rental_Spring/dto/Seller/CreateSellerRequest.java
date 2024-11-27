package com.UrbanElite.Car_Rental_Spring.dto.Seller;

import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class CreateSellerRequest {
    private String nameSeller;
    private String lastnameSeller;
    private String emailSeller;
    private String telSeller;
    private String locationSeller;
    private String username;
    private String passwordSeller;
}
