    package com.UrbanElite.Car_Rental_Spring.entity;

    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.List;
    import java.util.UUID;

    @Entity
    @Data
    @NoArgsConstructor
    public class Car {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        @Column(nullable = false, name = "brand")
        private String brand;
        @Column(nullable = false, name = "type")
        private String type;
        @Column(nullable = false, name = "name")
        private String name;
        @Column(nullable = false, name = "yearofmanufacture")
        private Integer yearofmanufacture;
        @Column(nullable = false, name = "seats")
        private Integer seats;
        @Column(nullable = false, name = "doors")
        private Integer doors;
        @Column(nullable = false, name = "baggages")
        private Integer baggages;
        @Column(nullable = false, name = "transmission")
        private String transmission;
        @Column(nullable = false, name = "priceperday")
        private String priceperday;
        @Column(nullable = false, name = "mileagekm")
        private Integer mileagekm;
        @Column(nullable = false, name = "engine")
        private String engine;
        @Column(nullable = false, name = "color")
        private String color;
        @Column(nullable = false, name = "describecar", columnDefinition = "TEXT")
        private String describecar;


        @ElementCollection
        @CollectionTable(name = "car_images", joinColumns = @JoinColumn(name = "car_id"))
        @Column(name = "imagescar", nullable = false)
        private List<String> imagescar;

        @ElementCollection
        @CollectionTable(name = "car_more_options", joinColumns = @JoinColumn(name = "car_id"))
        @Column(name = "more_option", nullable = false)
        private List<String> moreoptions;

        @ManyToOne
        @JoinColumn(nullable = false, referencedColumnName = "id", name = "seller_id")
        private Seller seller;

    }
