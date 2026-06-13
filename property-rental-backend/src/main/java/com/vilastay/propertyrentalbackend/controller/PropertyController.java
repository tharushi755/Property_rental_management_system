package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    // Get all properties with pagination, sorting, and filtering
    @GetMapping
    public Map<String, Object> getAllProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Property> propertyPage;

        if (location != null || type != null || minPrice != null || maxPrice != null) {
            // Filter logic
            List<Property> allProperties = propertyRepository.findAll();
            List<Property> filtered = allProperties.stream()
                    .filter(p -> location == null || p.getLocation().toLowerCase().contains(location.toLowerCase()))
                    .filter(p -> type == null || p.getType().equalsIgnoreCase(type))
                    .filter(p -> minPrice == null || p.getPrice() >= minPrice)
                    .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                    .toList();

            Map<String, Object> response = new HashMap<>();
            response.put("content", filtered);
            response.put("totalElements", filtered.size());
            response.put("totalPages", 1);
            response.put("currentPage", page);
            return response;
        }

        propertyPage = propertyRepository.findAll(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", propertyPage.getContent());
        response.put("totalElements", propertyPage.getTotalElements());
        response.put("totalPages", propertyPage.getTotalPages());
        response.put("currentPage", propertyPage.getNumber());

        return response;
    }

    // Get single property by ID
    @GetMapping("/{id}")
    public Property getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id).orElse(null);
    }

    // Create new property
    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        property.setStatus("PENDING");
        return propertyRepository.save(property);
    }

    // Update property
    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        Property property = propertyRepository.findById(id).orElse(null);
        if (property != null) {
            property.setTitle(propertyDetails.getTitle());
            property.setType(propertyDetails.getType());
            property.setLocation(propertyDetails.getLocation());
            property.setPrice(propertyDetails.getPrice());
            property.setGuests(propertyDetails.getGuests());
            property.setBeds(propertyDetails.getBeds());
            property.setBaths(propertyDetails.getBaths());
            property.setDescription(propertyDetails.getDescription());
            property.setImageUrl(propertyDetails.getImageUrl());
            property.setAmenities(propertyDetails.getAmenities());
            return propertyRepository.save(property);
        }
        return null;
    }

    // Delete property
    @DeleteMapping("/{id}")
    public Map<String, String> deleteProperty(@PathVariable Long id) {
        propertyRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Property deleted successfully");
        return response;
    }
}