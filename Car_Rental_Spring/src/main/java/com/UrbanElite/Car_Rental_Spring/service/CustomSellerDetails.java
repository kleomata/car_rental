package com.UrbanElite.Car_Rental_Spring.service;


import com.UrbanElite.Car_Rental_Spring.entity.Admin;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomSellerDetails implements UserDetails {
    private final Seller seller;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomSellerDetails(Seller seller, Collection<? extends GrantedAuthority> authorities) {
        this.seller = seller;
        this.authorities = authorities;
    }

    public Seller getSeller() {
        return seller;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return seller.getPasswordSeller();
    }

    @Override
    public String getUsername() {
        return seller.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
