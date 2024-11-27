package com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage;

import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Car;
import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id", nullable = false)
    private Seller seller;

    @Column(nullable = false, name = "price")
    private Long price;

    @Column(nullable = false, name = "totalprice")
    private Long totalprice;

    @Column(nullable = false, name = "namecar")
    private String namecar;

    @Column(nullable = false, name = "text")
    private String text;

    @Column(nullable = false, name = "startDate")
    private LocalDate startDate;

    @Column(nullable = false, name = "endDate")
    private LocalDate endDate;

    @Column(nullable = false, name = "status")
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;
}
