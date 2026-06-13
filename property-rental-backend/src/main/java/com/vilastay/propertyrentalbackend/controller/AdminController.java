package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.Booking;
import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.BookingRepository;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // Dashboard Statistics - REAL DATA from database
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalProperties = propertyRepository.count();
        long totalBookings = bookingRepository.count();
        long totalRevenue = bookingRepository.getTotalRevenue();
        long pendingProperties = propertyRepository.countByStatus("PENDING");
        long activeUsers = userRepository.countByActive(true);
        long monthlyBookings = bookingRepository.getMonthlyBookingsCount();
        long monthlyRevenue = bookingRepository.getMonthlyRevenue();

        stats.put("totalUsers", totalUsers);
        stats.put("totalProperties", totalProperties);
        stats.put("totalBookings", totalBookings);
        stats.put("totalRevenue", totalRevenue);
        stats.put("pendingProperties", pendingProperties);
        stats.put("activeUsers", activeUsers);
        stats.put("monthlyBookings", monthlyBookings);
        stats.put("monthlyRevenue", monthlyRevenue);

        return stats;
    }

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user role
    @PutMapping("/users/{id}/role")
    public User updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> roleData) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setRole(roleData.get("role"));
            return userRepository.save(user);
        }
        return null;
    }

    // Delete user
    @DeleteMapping("/users/{id}")
    public Map<String, String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted");
        return response;
    }

    // Get all properties (for admin)
    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Approve property
    @PutMapping("/properties/{id}/approve")
    public Property approveProperty(@PathVariable Long id) {
        Property property = propertyRepository.findById(id).orElse(null);
        if (property != null) {
            property.setStatus("APPROVED");
            return propertyRepository.save(property);
        }
        return null;
    }

    // Get all bookings (for admin)
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Suspend/Activate user
    @PutMapping("/users/{id}/status")
    public Map<String, Object> toggleUserStatus(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            user.setActive(!user.isActive());
            userRepository.save(user);
            response.put("success", true);
            response.put("message", user.isActive() ? "User activated" : "User suspended");
            response.put("active", user.isActive());
        } else {
            response.put("success", false);
            response.put("error", "User not found");
        }
        return response;
    }

}