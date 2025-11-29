package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom query methods can be added here if needed (e.g., findByCategory)

    Optional<Product> findByName(String name);
}
