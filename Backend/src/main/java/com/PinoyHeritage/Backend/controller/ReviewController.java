package com.PinoyHeritage.Backend.controller;

import com.PinoyHeritage.Backend.entity.Review;
import com.PinoyHeritage.Backend.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Submit a review
    @PostMapping("/{productId}/reviews")
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

            Review review = reviewService.addReview(productId, customerId, rating, comment);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
            
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Get all reviews for a product
    @GetMapping("/{productId}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable Long productId) {
        try {
            List<Review> reviews = reviewService.getReviewsForProduct(productId);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}