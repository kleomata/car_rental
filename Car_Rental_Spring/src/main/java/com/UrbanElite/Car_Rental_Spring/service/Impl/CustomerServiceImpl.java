package com.UrbanElite.Car_Rental_Spring.service.Impl;

import com.UrbanElite.Car_Rental_Spring.Util.JwtUtil;
import com.UrbanElite.Car_Rental_Spring.configuration.JwtBlacklistService;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.GetCustomerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.LoginCustomerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Customer.RegisterCustomerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.GetAdminResponse;
import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import com.UrbanElite.Car_Rental_Spring.entity.Role;
import com.UrbanElite.Car_Rental_Spring.repository.CustomerRepository;
import com.UrbanElite.Car_Rental_Spring.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtBlacklistService jwtBlacklistService;


    @Override
    public GetCustomerResponse registerCustomer(RegisterCustomerRequest request, String image) {
        Customer customer = new Customer();

        customer.setNameCustomer(request.getNameCustomer());
        customer.setLastnameCustomer(request.getLastnameCustomer());
        customer.setUsername(request.getUsername());
        customer.setEmailCustomer(request.getEmailCustomer());
        customer.setPhoneCustomer(request.getPhoneCustomer());
        customer.setGender(request.getGender());

        if (image != null && !image.isEmpty()) {
            customer.setImageCustomer(image);
        }

        customer.setBirthdate(request.getBirthdate());


        customer.setLocation(request.getLocation());
        customer.setRoleCustomer(Role.ROLE_CUSTOMER);

        String enncryptedPassword = passwordEncoder.encode(request.getPasswordCustomer());
        customer.setPasswordCustomer(enncryptedPassword);

        Customer registerCustomer = customerRepository.save(customer);

        GetCustomerResponse response = new GetCustomerResponse();

        response.setId(registerCustomer.getId());
        response.setNameCustomer(registerCustomer.getNameCustomer());
        response.setLastnameCustomer(registerCustomer.getLastnameCustomer());
        response.setUsername(registerCustomer.getUsername());
        response.setEmailCustomer(registerCustomer.getEmailCustomer());
        response.setPhoneCustomer(registerCustomer.getPhoneCustomer());
        response.setGender(registerCustomer.getGender());
        response.setImageCustomer(registerCustomer.getImageCustomer());
        response.setBirthdate(registerCustomer.getBirthdate());
        response.setLocation(registerCustomer.getLocation());

        return response;

    }

    @Override
    public GetCustomerResponse loginCustomer(LoginCustomerRequest request) {
        Customer customer = customerRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Customer not Found"));

        if (!passwordEncoder.matches(request.getPasswordCustomer(), customer.getPasswordCustomer())) {
            throw new RuntimeException("Invalid Password Customer!");
        }

        String token = jwtUtil.generateToken(customer.getUsername());

        return mapCustomerToGetCustomerResponse(customer, token);
    }

    @Override
    public void logutCustomer(String token) {
        jwtBlacklistService.blacklistToken(token);
    }

    private final String UPLOAD_DIR = "/home/kmata/Desktop/CarRentalProject/Profile/";

    @Override
    public String saveProfileImage(MultipartFile image) {
        String imagePath = null;

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (image != null && !image.isEmpty()) {
            Path filePath = Paths.get((UPLOAD_DIR) + image.getOriginalFilename());

            try {
                Files.copy(image.getInputStream(), filePath);
                imagePath = filePath.toString();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return imagePath;
    }

    @Override
    public String generateToken (String username) {
        return jwtUtil.generateToken(username);
    }

    @Override
    public GetCustomerResponse getCustomerByUsername(String username) {
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Customer not Found"));

        String image = Optional.ofNullable(customer.getImageCustomer())
                .map(img -> "/api/customer/imageCustomer/" +Paths.get(img).getFileName().toString())
                .orElse(null);

        return new GetCustomerResponse(customer, image);
    }

    private GetCustomerResponse mapCustomerToGetCustomerResponse(Customer customer, String token){
        GetCustomerResponse response = new GetCustomerResponse();
        response.setId(customer.getId());
        response.setNameCustomer(customer.getNameCustomer());
        response.setLastnameCustomer(customer.getLastnameCustomer());
        response.setUsername(customer.getUsername());
        response.setEmailCustomer(customer.getEmailCustomer());
        response.setPhoneCustomer(customer.getPhoneCustomer());
        response.setGender(customer.getGender());
        response.setImageCustomer(customer.getImageCustomer());
        response.setBirthdate(customer.getBirthdate());
        response.setLocation(customer.getLocation());

        response.setToken(token);

        return response;
    }
}
