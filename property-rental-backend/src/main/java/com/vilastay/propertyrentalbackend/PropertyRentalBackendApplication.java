package com.vilastay.propertyrentalbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PropertyRentalBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyRentalBackendApplication.class, args);
        System.out.println("========================================");
        System.out.println("  🏠 Backend Started!");
        System.out.println("  http://localhost:8080/api/test/hello");
        System.out.println("========================================");
    }
}