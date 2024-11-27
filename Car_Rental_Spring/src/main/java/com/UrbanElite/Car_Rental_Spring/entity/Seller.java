package com.UrbanElite.Car_Rental_Spring.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, name = "nameSeller")
    private String nameSeller;

    @Column(nullable = false, name = "lastnameSeller")
    private String lastnameSeller;

    @Column(nullable = false, name = "emailSeller", unique = true)
    private String emailSeller;

    @Column(nullable = false,  name = "telSeller")
    private String telSeller;

    @Column(nullable = false, name = "locationSeller")
    private String locationSeller;

    @Column(nullable = false, name = "username", unique = true)
    private String username;

    @Column(nullable = false, name = "passwordSeller")
    private String passwordSeller;


    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id", nullable = false)
    private Admin admin;

    @Column(nullable = false, name = "roleSeller")
    @Enumerated(EnumType.STRING)
    private Role roleSeller;
}
