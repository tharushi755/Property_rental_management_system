package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/test")
    public Map<String, String> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Auth API is working!");
        return response;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("error", "Email already registered");
            response.put("success", false);
            return response;
        }

        // Validate inputs
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            response.put("error", "Name is required");
            response.put("success", false);
            return response;
        }

        if (user.getPassword() == null || user.getPassword().length() < 6) {
            response.put("error", "Password must be at least 6 characters");
            response.put("success", false);
            return response;
        }

        try {
            // Encrypt password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(user.getRole() == null ? "GUEST" : user.getRole());
            user.setActive(true);

            User savedUser = userRepository.save(user);

            // Remove password from response
            savedUser.setPassword(null);

            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", savedUser);
        } catch (Exception e) {
            response.put("error", "Registration failed: " + e.getMessage());
            response.put("success", false);
        }

        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        Map<String, Object> response = new HashMap<>();
        String email = loginData.get("email");
        String password = loginData.get("password");

        try {
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                response.put("success", false);
                response.put("error", "User not found");
                return response;
            }

            if (!passwordEncoder.matches(password, user.getPassword())) {
                response.put("success", false);
                response.put("error", "Invalid password");
                return response;
            }

            if (!user.isActive()) {
                response.put("success", false);
                response.put("error", "Account is disabled");
                return response;
            }

            // Remove password from response
            user.setPassword(null);

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", user);

        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Login failed: " + e.getMessage());
        }

        return response;
    }
}