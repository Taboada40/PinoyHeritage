package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct_Id(Long productId);
    List<Review> findByCustomer_Id(Long customerId);
    boolean existsByCustomer_IdAndProduct_Id(Long customerId, Long productId);
    boolean existsByCustomer_IdAndProduct_IdAndOrderId(Long customerId, Long productId, Long orderId);
}