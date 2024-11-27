package com.UrbanElite.Car_Rental_Spring.service.Impl;

import com.UrbanElite.Car_Rental_Spring.dto.Car.AddCarRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Car.GetCarResponse;
import com.UrbanElite.Car_Rental_Spring.entity.Car;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import com.UrbanElite.Car_Rental_Spring.repository.CarRespository;
import com.UrbanElite.Car_Rental_Spring.repository.SellerRepository;
import com.UrbanElite.Car_Rental_Spring.service.CarService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRespository carRespository;

    @Autowired
    private SellerRepository sellerRepository;

    private final String UPLOAD_DIR = "/home/kmata/Desktop/CarRentalProject/Images/";

    @Override
    public List<String> saveImages(MultipartFile[] images) {
        List<String> imagePaths = new ArrayList<>();

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (IOException e) {
            e.printStackTrace();
        }
        for (MultipartFile image : images) {
            Path filePath = Paths.get(UPLOAD_DIR + image.getOriginalFilename());
            try {
                Files.copy(image.getInputStream(), filePath);
                imagePaths.add(filePath.toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return imagePaths;
    }


    @Override
    public GetCarResponse addCar(AddCarRequest response, UUID sellerId, List<String> imagesPath) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not Found"));

        Car car = new Car();
        car.setBrand(response.getBrand());
        car.setType(response.getType());
        car.setName(response.getName());
        car.setYearofmanufacture(response.getYearofmanufacture());
        car.setSeats(response.getSeats());
        car.setDoors(response.getDoors());
        car.setBaggages(response.getBaggages());
        car.setTransmission(response.getTransmission());
        car.setPriceperday(response.getPriceperday());
        car.setMileagekm(response.getMileagekm());
        car.setEngine(response.getEngine());
        car.setColor(response.getColor());
        car.setDescribecar(response.getDescribecar());
        //car.setImagescar(response.getImagescar());
        car.setMoreoptions(response.getMoreoptions());
        car.setSeller(seller);
        car.setImagescar(imagesPath);

        carRespository.save(car);
        return new GetCarResponse(car, imagesPath);
    }

    @Override
    public List<GetCarResponse> getAllCar(UUID sellerId) {
        List<Car> cars = carRespository.findBySellerId(sellerId);

        return cars.stream()
                .map(car -> {
                    /////////////////
                    List<String> images = car.getImagescar()
                            .stream()
                            .map(image -> "/api/seller/images/" + Paths.get(image).getFileName().toString())
                            .collect(Collectors.toList());
                    return new GetCarResponse(car, images);
                    //////////////
                })
                .collect(Collectors.toList());
    }

    @Override
    public GetCarResponse getCarById(UUID id, UUID sellerId) {

        Car car =  carRespository.findByIdAndSellerId(id, sellerId);
                //.orElseThrow(() -> new RuntimeException("Car not Found"));

        List<String> images = car.getImagescar()
                .stream()
                .map(image -> "/api/seller/images/" + Paths.get(image).getFileName().toString())
                .collect(Collectors.toList());

        return new GetCarResponse(car, images);

    }

}
