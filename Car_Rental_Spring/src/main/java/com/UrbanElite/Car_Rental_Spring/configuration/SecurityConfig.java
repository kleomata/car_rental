package com.UrbanElite.Car_Rental_Spring.configuration;

import com.UrbanElite.Car_Rental_Spring.service.CustomAdminDetailsService;
import com.UrbanElite.Car_Rental_Spring.service.CustomCustomerDetailsService;
import com.UrbanElite.Car_Rental_Spring.service.CustomSellerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(securedEnabled = true)
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomAdminDetailsService customAdminDetailsService;

    @Autowired
    private CustomSellerDetailsService customSellerDetailsService;

    @Autowired
    private CustomCustomerDetailsService customCustomerDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/admin").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/admin/login").permitAll()
                        .requestMatchers("/api/admin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/admin/allSellers").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/admin/createSeller").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/admin/editSeller/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/deleteSeller/*").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET,"/api/admin/getAdmin").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/admin/logoutAdmin").hasRole("ADMIN")
                        .requestMatchers("/api/admin-home").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/seller").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/seller/loginSeller").permitAll()
                        .requestMatchers("/api/seller").hasRole("SELLER")
                        .requestMatchers(HttpMethod.GET,"/api/seller/idSeller").hasRole("SELLER")
                        .requestMatchers("/api/seller-home").authenticated()
                        .requestMatchers(HttpMethod.POST,"/api/seller/addCar").hasRole("SELLER")
                        .requestMatchers(HttpMethod.GET, "/api/seller/allCars").hasRole("SELLER")
                        .requestMatchers(HttpMethod.GET,"/api/seller/images/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/seller/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/seller/logoutSeller").hasRole("SELLER")


                        .requestMatchers(HttpMethod.GET, "/api/user/allCarsUser").permitAll()
                        //.requestMatchers(HttpMethod.GET,"/api/user/images/*").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/*").permitAll()

                        //.requestMatchers(HttpMethod.POST, "/api/customer").permitAll()
                        //.requestMatchers("/api/customer").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/customer/registerCustomer").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/customer/loginCustomer").permitAll()
                        .requestMatchers("/api/customer/**").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/customer/idCustomer").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/customer/imageCustomer/*").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/customer/logoutCustomer").hasRole("CUSTOMER")


                        .requestMatchers("/api/reservation").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/reservation/sendReservation").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/reservation/reservationForSeller").hasRole("SELLER")
                        .requestMatchers(HttpMethod.POST, "/api/reservation/acceptReservation/*").hasRole("SELLER")
                        .requestMatchers(HttpMethod.POST, "/api/reservation/rejectReservation/*").hasRole("SELLER")

                        .requestMatchers(HttpMethod.GET,"/api/reservation/reservationForCustomer").hasRole("CUSTOMER")
                )

                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customAdminDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider sellerAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customSellerDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationProvider customerAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customCustomerDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

}
