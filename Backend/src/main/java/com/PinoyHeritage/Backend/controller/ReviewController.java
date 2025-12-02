package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Review;
import com.PinoyHeritage.Backend.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Submit a review
    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<?> addReview(
            @PathVariable Long productId,
            @RequestBody Map<String, Object> data
    ) {
        try {
            System.out.println("Received review for product: " + productId);
            System.out.println("Data: " + data);

            Long customerId = Long.valueOf(data.get("customerId").toString());
            Integer rating = ((Number) data.get("rating")).intValue();
            String comment = (String) data.get("comment");
            Long orderId = data.get("orderId") != null ? Long.valueOf(data.get("orderId").toString()) : null;

            Review review = reviewService.addReview(productId, customerId, rating, comment, orderId);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
            
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get all reviews for a product
    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<?> getProductReviews(@PathVariable Long productId) {
        try {
            List<Review> reviews = reviewService.getReviewsForProduct(productId);
            
            // Calculate average rating
            double averageRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
                
            // Return both reviews and average rating
            return ResponseEntity.ok(Map.of(
                "reviews", reviews,
                "rating", Math.round(averageRating * 10) / 10.0  // Round to 1 decimal place
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/reviews/user/{userId}")
    public ResponseEntity<?> getUserReviews(@PathVariable Long userId) {
        try {
            List<Review> reviews = reviewService.getReviewsByCustomer(userId);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/reviews/check")
    public ResponseEntity<?> checkIfUserReviewedProduct(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam(required = false) Long orderId) {
        try {
            boolean hasReviewed = reviewService.hasCustomerReviewedProduct(userId, productId, orderId);
            return ResponseEntity.ok(Map.of("hasReviewed", hasReviewed));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}