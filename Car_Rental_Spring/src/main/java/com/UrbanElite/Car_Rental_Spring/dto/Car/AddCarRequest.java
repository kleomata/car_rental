package com.UrbanElite.Car_Rental_Spring.dto.Car;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class AddCarRequest {
    //private GetCarResponse car;
    //private MultipartFile[] images;

    //private UUID id;

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
    private List<String> moreoptions;

}
