package com.UrbanElite.Car_Rental_Spring.service;


import com.UrbanElite.Car_Rental_Spring.entity.Role;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import com.UrbanElite.Car_Rental_Spring.repository.SellerRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class CustomSellerDetailsService implements UserDetailsService {
    private final SellerRepository sellerRepository;

    public CustomSellerDetailsService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Seller seller = sellerRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Seller not Found"));

        return new CustomSellerDetails(seller, getAuthorities(seller.getRoleSeller()));
    }

    private Collection<?extends GrantedAuthority> getAuthorities(Role role) {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }
}
