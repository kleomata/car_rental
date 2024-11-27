package com.UrbanElite.Car_Rental_Spring.dto.Car;

import com.UrbanElite.Car_Rental_Spring.entity.Car;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class GetCarResponse {

    private UUID id;

    private String brand;
    private String type;
    private String name;
    private Integer yearofmanufacture;
    private Integer seats;
    private Integer doors;
    private Integer baggages;
    private String transmission;
    private String priceperday;
    private Integer mileagekm;
    private String engine;
    private String color;
    private String describecar;
    private List<String> imagescar;

    private List<String> moreoptions;
    private UUID sellerid;

    public GetCarResponse(Car car, List<String> images) {
        this.id = car.getId();
        this.brand = car.getBrand();
        this.type = car.getType();
        this.name = car.getName();
        this.yearofmanufacture = car.getYearofmanufacture();
        this.seats = car.getSeats();
        this.doors = car.getDoors();
        this.baggages = car.getBaggages();
        this.transmission = car.getTransmission();
        this.priceperday = car.getPriceperday();
        this.mileagekm = car.getMileagekm();
        this.engine = car.getEngine();
        this.color = car.getColor();
        this.describecar = car.getDescribecar();
        //this.imagescar = car.getImagescar();
        this.imagescar = images;
        this.moreoptions = car.getMoreoptions();
    }
}
