/*package com.UrbanElite.Car_Rental_Spring.configuration;

import com.UrbanElite.Car_Rental_Spring.Util.JwtUtil;
import com.UrbanElite.Car_Rental_Spring.service.CustomAdminDetailsService;
import com.UrbanElite.Car_Rental_Spring.service.CustomSellerDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomAdminDetailsService customAdminDetailsService;

    @Autowired
    private CustomSellerDetailsService customSellerDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customAdminDetailsService.loadUserByUsername(username);

            if (jwtUtil.isTokenValid(jwt, username)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                System.out.println("Toke is Null!");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return; // Kthehu në mënyrë që të mos vazhdojë me filtrin tjetër
            }
        }

        chain.doFilter(request, response);
    }
}*/
package com.UrbanElite.Car_Rental_Spring.configuration;

import com.UrbanElite.Car_Rental_Spring.Util.JwtUtil;
import com.UrbanElite.Car_Rental_Spring.service.CustomAdminDetailsService;
import com.UrbanElite.Car_Rental_Spring.service.CustomCustomerDetailsService;
import com.UrbanElite.Car_Rental_Spring.service.CustomSellerDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomAdminDetailsService customAdminDetailsService;

    @Autowired
    private CustomSellerDetailsService customSellerDetailsService;

    @Autowired
    private CustomCustomerDetailsService customCustomerDetailsService;

    @Autowired
    private JwtBlacklistService jwtBlacklistService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            if (jwtBlacklistService.isTokenBlacklisted(jwt)) {
                System.out.println("Token is blacklisted!");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }

            UserDetails userDetails = loadUserDetails(username);

            if (jwtUtil.isTokenValid(jwt, username)) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                System.out.println("Token is invalid!");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private UserDetails loadUserDetails(String username) {
        UserDetails userDetails = null;
        try {
            userDetails = customAdminDetailsService.loadUserByUsername(username);
        } catch (Exception e1) {
            try {
                userDetails = customSellerDetailsService.loadUserByUsername(username);
            } catch (Exception e2) {
                try {
                    userDetails = customCustomerDetailsService.loadUserByUsername(username);
                } catch (Exception e3) {
                    System.out.println("User not found: "+username);
                }
            }
        }
        return userDetails;
    }
}
