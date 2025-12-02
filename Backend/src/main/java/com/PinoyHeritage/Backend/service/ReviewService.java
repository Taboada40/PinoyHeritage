package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Review;

import java.util.List;

public interface ReviewService {
    Review addReview(Long productId, Long customerId, Integer rating, String comment);
    List<Review> getReviewsForProduct(Long productId);
    boolean hasCustomerReviewedProduct(Long customerId, Long productId);
    List<Review> getReviewsByCustomer(Long customerId);
}