package com.UrbanElite.Car_Rental_Spring.service;

import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomCustomerDetails implements UserDetails {

    private final Customer customer;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomCustomerDetails(Customer customer, Collection<? extends GrantedAuthority> authorities) {
        this.customer = customer;
        this.authorities = authorities;
    }

    public Customer customer() {
        return customer;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return customer.getPasswordCustomer();
    }

    @Override
    public String getUsername() {
        return customer.getUsername();
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
