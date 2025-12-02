package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.ReviewImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {
    // Custom query methods can be added here if needed
}
