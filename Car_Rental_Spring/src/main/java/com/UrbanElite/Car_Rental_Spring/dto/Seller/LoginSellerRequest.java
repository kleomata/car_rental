package com.UrbanElite.Car_Rental_Spring.dto.Seller;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginSellerRequest {
    private String username;
    private String password;
}
