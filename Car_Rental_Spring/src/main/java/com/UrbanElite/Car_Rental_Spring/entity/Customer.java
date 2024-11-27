package com.UrbanElite.Car_Rental_Spring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @Column(nullable = false, name = "nameCustomer")
    private String nameCustomer;

    @Column(nullable = false, name = "lastnameCustomer")
    private String lastnameCustomer;

    @Column(nullable = false, name = "username", unique = true)
    private String username;

    @Column(nullable = false, name = "passwordCustomer")
    private String passwordCustomer;

    @Column(nullable = false, name = "emailCustomer", unique = true)
    private String emailCustomer;

    @Column(nullable = false, name = "phoneCustomer")
    private String phoneCustomer;

    @Column(nullable = false, name = "gender")
    private String gender;

    @Column(nullable = false, name = "imageCustomer")
    private String imageCustomer;

    @Column(nullable = false, name = "birthdate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private LocalDate birthdate;

    @Column(nullable = false, name = "location")
    private String location;

    @Column(nullable = false, name = "roleCustomer")
    @Enumerated(EnumType.STRING)
    private Role roleCustomer;

}
