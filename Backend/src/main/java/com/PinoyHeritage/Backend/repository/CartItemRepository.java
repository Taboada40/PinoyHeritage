package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByCartId(Long cartId);
    Optional<CartItem> findByCartIdAndProductName(Long cartId, String productName);
    void deleteByCartId(Long cartId);
}