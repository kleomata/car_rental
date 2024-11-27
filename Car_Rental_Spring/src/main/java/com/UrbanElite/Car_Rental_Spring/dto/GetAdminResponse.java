package com.UrbanElite.Car_Rental_Spring.dto;

import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class GetAdminResponse {
    private UUID id;
    private String name;
    private String lastname;
    private String username;


    // TOKEN
    private String token;

    public GetAdminResponse(Admin admin) {
        this.id = admin.getId();
        this.name = admin.getName();
        this.lastname = admin.getLastname();
        this.username = admin.getUsername();
    }
}
