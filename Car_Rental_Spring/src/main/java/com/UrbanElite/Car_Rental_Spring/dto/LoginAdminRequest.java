package com.UrbanElite.Car_Rental_Spring.dto;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginAdminRequest {

    private String username;
    private String password;

}
