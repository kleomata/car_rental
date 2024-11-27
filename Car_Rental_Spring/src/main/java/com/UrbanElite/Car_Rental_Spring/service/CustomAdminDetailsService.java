package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Role;
import com.UrbanElite.Car_Rental_Spring.repository.AdminRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomAdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    public CustomAdminDetailsService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Optional<Admin> admin = adminRepository.findByUsername(username);
        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not Found"));

        //if (admin.isEmpty()) {
          //  throw new UsernameNotFoundException("Admin not Found");
        //}

        return new CustomUserDetails(admin, getAuthorities(admin.getRole()));


       // return new org.springframework.security.core.userdetails.User(admin.get().getUsername(), admin.get().getPassword(),
         //       getAuthorities(admin.get().getRole()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Role role){
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()/*String.valueOf(role))*/));
    }
}
