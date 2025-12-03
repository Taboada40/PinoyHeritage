package com.PinoyHeritage.Backend.repository;

import com.PinoyHeritage.Backend.entity.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {
    void deleteByProduct_Id(Long productId);
}
