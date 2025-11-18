package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Custom query methods can be added here if needed (e.g., findByCategory)
}