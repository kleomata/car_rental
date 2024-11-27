package com.UrbanElite.Car_Rental_Spring.service.Impl;

import com.UrbanElite.Car_Rental_Spring.dto.Reservation.GetReservationForCustomerResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Reservation.GetReservationResponse;
import com.UrbanElite.Car_Rental_Spring.dto.Reservation.SendReservationRequest;
import com.UrbanElite.Car_Rental_Spring.entity.Car;
import com.UrbanElite.Car_Rental_Spring.entity.Customer;
import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.Reservation;
import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.ReservationMessage;
import com.UrbanElite.Car_Rental_Spring.entity.ReservationPackage.ReservationStatus;
import com.UrbanElite.Car_Rental_Spring.entity.Seller;
import com.UrbanElite.Car_Rental_Spring.repository.*;
import com.UrbanElite.Car_Rental_Spring.service.CustomCustomerDetails;
import com.UrbanElite.Car_Rental_Spring.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImp implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CarRespository carRespository;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ReservationMessageRepository reservationMessageRepository;

    @Override
    public GetReservationResponse sendReservation(SendReservationRequest request, Authentication authentication) {
        UUID customerId = ((CustomCustomerDetails) authentication.getPrincipal()).customer().getId();

        Car car = carRespository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not Found"));

        Seller seller = car.getSeller();

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not Found"));

        Reservation reservation = new Reservation();
        reservation.setCar(car);
        reservation.setCustomer(customer);
        reservation.setSeller(seller);
        reservation.setPrice(request.getPrice());
        reservation.setTotalprice(request.getTotalprice());
        reservation.setNamecar(request.getNamecar());
        reservation.setText(request.getText());
        reservation.setStartDate(request.getStartDate());
        reservation.setEndDate(request.getEndDate());
        reservation.setStatus(ReservationStatus.PENDING);

        reservationRepository.save(reservation);

        return new GetReservationResponse(reservation);
    }

    @Override
    public List<GetReservationResponse> getReservationForSeller(UUID sellerId) {

        List<Reservation> reservations = reservationRepository.findBySellerId(sellerId);

        return reservations.stream()
                .map(GetReservationResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<GetReservationForCustomerResponse> getReservationForCustomer(UUID customerId) {

        List<Reservation> reservations = reservationRepository.findByCustomerId(customerId);

        return reservations.stream()
                .map(reservation -> {
                    ReservationMessage reservationMessage = reservationMessageRepository.findByReservationId(reservation.getId());
                    String message = (reservationMessage != null) ? reservationMessage.getMessage() : null;

                    return new GetReservationForCustomerResponse(reservation, message);
                })
                .collect(Collectors.toList());

    }

    @Override
    public void acceptReservation(UUID reservationId, String message, UUID sellerId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (!reservation.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("You are not authorized to accept this reservation");
        }

        reservation.setStatus(ReservationStatus.ACCEPTED);

        ReservationMessage reservationMessage = new ReservationMessage();
        reservationMessage.setReservation(reservation);
        reservationMessage.setMessage(message);
        reservationMessageRepository.save(reservationMessage);

        reservationRepository.save(reservation);
    }

    @Override
    public void rejectReservation(UUID reservationId, String message, UUID sellerId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (!reservation.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("You are not authorized to reject this reservation");
        }


        reservation.setStatus(ReservationStatus.REJECTED);

        ReservationMessage reservationMessage = new ReservationMessage();
        reservationMessage.setReservation(reservation);
        reservationMessage.setMessage(message);
        reservationMessageRepository.save(reservationMessage);

        reservationRepository.save(reservation);
    }


}

