package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.Booking;
import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.BookingRepository;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a booking
    @PostMapping
    public Map<String, Object> createBooking(@RequestBody Map<String, Object> bookingData) {
        Map<String, Object> response = new HashMap<>();

        try {
            Long propertyId = Long.valueOf(bookingData.get("propertyId").toString());
            Long userId = Long.valueOf(bookingData.get("userId").toString());
            LocalDate checkIn = LocalDate.parse(bookingData.get("checkIn").toString());
            LocalDate checkOut = LocalDate.parse(bookingData.get("checkOut").toString());
            int guests = Integer.parseInt(bookingData.get("guests").toString());

            Property property = propertyRepository.findById(propertyId).orElse(null);
            User user = userRepository.findById(userId).orElse(null);

            if (property == null || user == null) {
                response.put("success", false);
                response.put("error", "Property or User not found");
                return response;
            }

            long nights = ChronoUnit.DAYS.between(checkIn, checkOut);
            int subtotal = (int) (property.getPrice() * nights);
            int totalPrice = subtotal + 40 + 25;

            Booking booking = new Booking();
            booking.setCheckIn(checkIn);
            booking.setCheckOut(checkOut);
            booking.setGuests(guests);
            booking.setNights((int) nights);
            booking.setSubtotal(subtotal);
            booking.setTotalPrice(totalPrice);
            booking.setProperty(property);
            booking.setUser(user);
            booking.setStatus("CONFIRMED");

            Booking saved = bookingRepository.save(booking);

            response.put("success", true);
            response.put("message", "Booking confirmed!");
            response.put("booking", saved);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }

        return response;
    }

    // Get bookings by user ID
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return bookingRepository.findByUser(user);
        }
        return List.of();
    }

    // Cancel booking
    @PutMapping("/{id}/cancel")
    public Map<String, Object> cancelBooking(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking != null) {
            booking.setStatus("CANCELLED");
            bookingRepository.save(booking);
            response.put("success", true);
            response.put("message", "Booking cancelled");
        } else {
            response.put("success", false);
            response.put("error", "Booking not found");
        }
        return response;
    }
}