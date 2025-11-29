package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByCartId(Long cartId);
    Optional<CartItem> findByCartIdAndProductName(Long cartId, String productName);
    void deleteByCartId(Long cartId);
    
    // Direct query by customer_id column
    List<CartItem> findByCustomerId(Long customerId);
    
    // Query via cart relationship
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.customer.id = :customerId")
    List<CartItem> findByCartCustomerId(@Param("customerId") Long customerId);
}