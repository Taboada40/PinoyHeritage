package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // New import

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // ⭐ NEW: Allows lookup by category name, needed for Item creation
    Optional<Category> findByName(String name);
}