package com.vilastay.propertyrentalbackend.controller;

import com.vilastay.propertyrentalbackend.entity.Property;
import com.vilastay.propertyrentalbackend.entity.Review;
import com.vilastay.propertyrentalbackend.entity.User;
import com.vilastay.propertyrentalbackend.repository.PropertyRepository;
import com.vilastay.propertyrentalbackend.repository.ReviewRepository;
import com.vilastay.propertyrentalbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/property/{propertyId}")
    public List<Review> getReviewsByProperty(@PathVariable Long propertyId) {
        return reviewRepository.findByPropertyId(propertyId);
    }

    @PostMapping
    public Map<String, Object> createReview(@RequestBody Map<String, Object> reviewData) {
        Map<String, Object> response = new HashMap<>();

        try {
            Long propertyId = Long.valueOf(reviewData.get("propertyId").toString());
            Long userId = Long.valueOf(reviewData.get("userId").toString());
            int rating = Integer.parseInt(reviewData.get("rating").toString());
            String comment = reviewData.get("comment").toString();

            Property property = propertyRepository.findById(propertyId).orElse(null);
            User user = userRepository.findById(userId).orElse(null);

            if (property == null || user == null) {
                response.put("error", "Property or User not found");
                return response;
            }

            Review review = new Review();
            review.setRating(rating);
            review.setComment(comment);
            review.setProperty(property);
            review.setUser(user);

            Review saved = reviewRepository.save(review);

            // Update property rating
            List<Review> allReviews = reviewRepository.findByPropertyId(propertyId);
            double avgRating = allReviews.stream().mapToInt(Review::getRating).average().orElse(0);
            property.setRating(avgRating);
            property.setReviews(allReviews.size());
            propertyRepository.save(property);

            response.put("success", true);
            response.put("review", saved);

        } catch (Exception e) {
            response.put("error", e.getMessage());
        }

        return response;
    }
}