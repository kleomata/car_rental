package com.UrbanElite.Car_Rental_Spring.service.Impl;

import com.UrbanElite.Car_Rental_Spring.Util.JwtUtil;
import com.UrbanElite.Car_Rental_Spring.configuration.JwtBlacklistService;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.CreateSellerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.EditSellerRequest;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.GetSellerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Seller.LoginSellerRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Role;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import com.UrbanElite.Car_Rental_Spring.repository.AdminRepository;
import com.UrbanElite.Car_Rental_Spring.repository.SellerRepository;
import com.UrbanElite.Car_Rental_Spring.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtBlacklistService jwtBlacklistService;

    @Override
    public GetSellerResponse createSeller(CreateSellerRequest request, UUID adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not Found"));

        Seller seller = new Seller();

        seller.setNameSeller(request.getNameSeller());
        seller.setLastnameSeller(request.getLastnameSeller());
        seller.setEmailSeller(request.getEmailSeller());
        seller.setTelSeller(request.getTelSeller());
        seller.setLocationSeller(request.getLocationSeller());
        seller.setUsername(request.getUsername());
        seller.setRoleSeller(Role.ROLE_SELLER);

        String encryptedPassword = passwordEncoder.encode(request.getPasswordSeller());
        seller.setPasswordSeller(encryptedPassword);

        seller.setAdmin(admin);

        Seller createdSeller = sellerRepository.save(seller);

        GetSellerResponse response = new GetSellerResponse();
        response.setId(createdSeller.getId());
        response.setNameSeller(createdSeller.getNameSeller());
        response.setLastnameSeller(createdSeller.getLastnameSeller());
        response.setEmailSeller(createdSeller.getEmailSeller());
        response.setTelSeller(createdSeller.getTelSeller());
        response.setLocationSeller(createdSeller.getLocationSeller());
        response.setUsername(createdSeller.getUsername());
        //response.setAdmin(admin);
        response.setAdminId(admin.getId());

        return response;

    }

    @Override
    public GetSellerResponse editSeller(EditSellerRequest request, UUID id, UUID adminId) {
        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));


        if(!seller.getAdmin().getId().equals(adminId)) {
            throw new RuntimeException("You don't have premission to edit this seller");
        }

        seller.setNameSeller(request.getNameSeller());
        seller.setLastnameSeller(request.getLastnameSeller());
        seller.setEmailSeller(request.getEmailSeller());
        seller.setTelSeller(request.getTelSeller());
        seller.setLocationSeller(request.getLocationSeller());
        seller.setUsername(request.getUsername());
        if (request.getPasswordSeller() != null) {
            seller.setPasswordSeller(passwordEncoder.encode(request.getPasswordSeller()));
        }


        Seller editSeller = sellerRepository.save(seller);
        GetSellerResponse response = new GetSellerResponse();
        response.setId(editSeller.getId());
        response.setNameSeller(editSeller.getNameSeller());
        response.setLastnameSeller(editSeller.getLastnameSeller());
        response.setEmailSeller(editSeller.getEmailSeller());
        response.setTelSeller(editSeller.getTelSeller());
        response.setLocationSeller(editSeller.getLocationSeller());
        response.setUsername(editSeller.getUsername());
        //response.setAdminId(admin);


        return response;
    }

    @Override
    public List<GetSellerResponse> getAllSeller() {
        return sellerRepository.findAll()
                .stream()
                .map(seller -> new GetSellerResponse(seller))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSeller(UUID id) {
        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not Found"));
        sellerRepository.delete(seller);
    }

    @Override
    public GetSellerResponse loginSeller(LoginSellerRequest request) {
        //authenticationProvider.authenticate(
          //      new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPasswordSeller())
        //);
     /*   Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPasswordSeller())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Seller seller = sellerRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Seller not Found"));

        String token = jwtUtil.generateToken(seller.getUsername());

        return mapSellerToGetSellerResponse(seller, token);
    */
      /*  Seller seller = sellerRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Seller not Found"));

        // Verifikoni fjalëkalimin
        if (!passwordEncoder.matches(request.getPasswordSeller(), seller.getPasswordSeller())) {
            throw new BadCredentialsException("Bad credentials");
        }

        // Krijoni token dhe vazhdoni
        String token = jwtUtil.generateToken(seller.getUsername());
        return mapSellerToGetSellerResponse(seller, token);
        */
        Seller seller = sellerRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Seller not Found"));

        if (!passwordEncoder.matches(request.getPassword(), seller.getPasswordSeller())) {
            throw new RuntimeException("Error password!");
        }

        String token = jwtUtil.generateToken(seller.getUsername());
        GetSellerResponse response = new GetSellerResponse(seller);
        response.setToken(token);

        return response;
    }

    @Override
    public void logutSeller(String token) {
        jwtBlacklistService.blacklistToken(token);
    }


    @Override
    public String generateToken (String username) {
        return jwtUtil.generateToken(username);
    }

    @Override
    public Seller getSellerById(String username) {
        return sellerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Seller not FOund"));
    }

    private GetSellerResponse mapSellerToGetSellerResponse(Seller seller, String token){
        GetSellerResponse sellerResponse = new GetSellerResponse();
        sellerResponse.setId(seller.getId());
        sellerResponse.setUsername(seller.getUsername());
        sellerResponse.setEmailSeller(seller.getEmailSeller());
        sellerResponse.setNameSeller(sellerResponse.getNameSeller());
        sellerResponse.setLastnameSeller(sellerResponse.getLastnameSeller());
        sellerResponse.setLocationSeller(sellerResponse.getLocationSeller());
        sellerResponse.setTelSeller(sellerResponse.getTelSeller());

        sellerResponse.setToken(token);

        return sellerResponse;

    }

}
