package com.PinoyHeritage.Backend.service;

import com.PinoyHeritage.Backend.entity.Product;
import com.PinoyHeritage.Backend.entity.Review;
import com.PinoyHeritage.Backend.entity.Customer;
import com.PinoyHeritage.Backend.repository.ProductRepository;
import com.PinoyHeritage.Backend.repository.ReviewRepository;
import com.PinoyHeritage.Backend.repository.CustomerRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             ProductRepository productRepository,
                             CustomerRepository customerRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public Review addReview(Long productId, Long customerId, Integer rating, String comment, Long orderId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));

        Review review = new Review();
        review.setProduct(product);
        review.setCustomer(customer);
        review.setRating(rating);
        review.setComment(comment);
        review.setOrderId(orderId);

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProduct_Id(productId);
    }

    @Override
    public boolean hasCustomerReviewedProduct(Long customerId, Long productId, Long orderId) {
        if (orderId != null) {
            return reviewRepository.existsByCustomer_IdAndProduct_IdAndOrderId(customerId, productId, orderId);
        }
        return reviewRepository.existsByCustomer_IdAndProduct_Id(customerId, productId);
    }

    @Override
    public List<Review> getReviewsByCustomer(Long customerId) {
        return reviewRepository.findByCustomer_Id(customerId);
    }
}