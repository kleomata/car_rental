package com.UrbanElite.Car_Rental_Spring.service.Impl;

import com.UrbanElite.Car_Rental_Spring.Util.JwtUtil;
import com.UrbanElite.Car_Rental_Spring.configuration.JwtBlacklistService;
import com.UrbanElite.Car_Rental_Spring.dto.GetAdminResponse;
import com.UrbanElite.Car_Rental_Spring.dto.LoginAdminRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Role;
import com.UrbanElite.Car_Rental_Spring.repository.AdminRepository;
import com.UrbanElite.Car_Rental_Spring.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtBlacklistService jwtBlacklistService;

    @Override
    public GetAdminResponse login(LoginAdminRequest request) {
        authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username not Found"));

        // TOKEN
        String token = jwtUtil.generateToken(admin.getUsername());

        return mapAdminToGetAdminResponse(admin, token);
    }

    @Override
    public void createAdmin(Admin admin) {
        admin.setPassword(new BCryptPasswordEncoder().encode(admin.getPassword()));
        admin.setRole(Role.ROLE_ADMIN);
        adminRepository.save(admin);
    }

    @Override
    public String generateToken (String username) {
        return jwtUtil.generateToken(username);
    }

    @Override
    public void logutAdmin(String token) {
        jwtBlacklistService.blacklistToken(token);
    }

    private GetAdminResponse mapAdminToGetAdminResponse(Admin admin, String token){
        GetAdminResponse adminResponse = new GetAdminResponse();
        adminResponse.setId(admin.getId());
        adminResponse.setName(admin.getName());
        adminResponse.setLastname(admin.getLastname());
        adminResponse.setUsername(admin.getUsername());

        adminResponse.setToken(token);

        return adminResponse;
    }

    @Override
    public GetAdminResponse getAdmin(String username) {
        Admin admin = adminRepository.findByUsername(username).
                orElseThrow(() -> new RuntimeException("Admin not Found"));

        return new GetAdminResponse(admin);
    }

}
