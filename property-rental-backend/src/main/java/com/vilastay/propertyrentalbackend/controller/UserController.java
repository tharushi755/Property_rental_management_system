package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Get user profile
    @GetMapping("/{id}")
    public User getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Update user profile
    @PutMapping("/{id}")
    public User updateUserProfile(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setName(userDetails.getName());
            user.setPhone(userDetails.getPhone());
            return userRepository.save(user);
        }
        return null;
    }

    // Update password
    @PutMapping("/{id}/password")
    public Map<String, String> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> passwordData) {
        User user = userRepository.findById(id).orElse(null);
        Map<String, String> response = new HashMap<>();

        if (user != null) {
            user.setPassword(passwordData.get("newPassword"));
            userRepository.save(user);
            response.put("message", "Password updated successfully");
        } else {
            response.put("error", "User not found");
        }
        return response;
    }
}