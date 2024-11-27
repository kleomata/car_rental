package com.UrbanElite.Car_Rental_Spring.dto.Seller;

import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class GetSellerResponse {
    private UUID id;
    private String nameSeller;
    private String lastnameSeller;
    private String emailSeller;
    private String telSeller;
    private String locationSeller;
    private String username;
    //private Admin admin;
    private UUID adminId;

    private String token;

   public GetSellerResponse(Seller seller) {
        this.id = seller.getId();
        this.nameSeller = seller.getNameSeller();
        this.lastnameSeller = seller.getLastnameSeller();
        this.emailSeller = seller.getEmailSeller();
        this.telSeller = seller.getTelSeller();
        this.locationSeller = seller.getLocationSeller();
        this.username = seller.getUsername();
        //this.adminId = seller.getAdmin();
   }
}
